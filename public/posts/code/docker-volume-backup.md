You love Docker, you put your data in volumes,
put a nice label on them when backing them up,
and use an excessive amount of temporary containers while doing so.
Might as well wrap it all up nice and tidy!

### A kind warning:

> This is more a post mortem, read me, post-it notes
kind of thing than a set of hard and fast rules and rigorous tools.
Care was taken to provide sane defaults and fail-fast error handling,
and it was subjected to `shellcheck` for linting. A lot.
Still, it wouldn't hurt to have a close look yourself before consigning
your precious data to an early and irreversible fate.

### The who and why

You put your services in `containers`, you put your data in `volumes`, and create
backups for your `volumes` from time to time.

Nothing fancy, you just want some neatly timestamped `volume` snapshots that you
can swap for the real thing and vice versa. Just. In. Case.

If you don't have a full blown orchestration framework and/or backup
procedure in place, this willl ikely involve a copious amount of
temporary containers and `cp`-ing between in-container paths.

So let's make this a little less painful and cumbersome.
And safer, too, while we're at it.

### The how


#### Shell options

```bash
#!/usr/bin/env sh

set -e
```

We don't use `set -u` here, since we want to provide some defaults
to make good on the whole 'less cumbersome' angle.

As such, we don't fail on unitialised variables. Not yet.

#### Script options

```bash
# inspect, create, apply
OPERATION="$1"
# postgres-data, sonarqube-data, sonarqube-extensions
VOLUME="$2"
# date; will be in the format 'yyyy-mm-dd' when created automatically
TIMESTAMP="$3"
```

This script takes three (positional) arguments:
 - an operation,
 - a volume ID,
 - and a timestamp.

The 'timestamp' is merely a suggestion, you can use any identifier
you see fit, as long as it is a valid suffix for a Docker `volume`.


#### Input validation

```bash
# validate ops argument
INSPECT='inspect'
CREATE='create'
APPLY='apply'

if [ -z "$OPERATION" ]
then
  printf "You did not specify an operation.\n"
  printf "Available operations are '%s', '%s', and '%s'.\n" "$INSPECT" "$CREATE" "$APPLY"
  exit 2
elif [ "$OPERATION" != "$INSPECT" ] && [ "$OPERATION" != "$CREATE" ] && [ "$OPERATION" != "$APPLY" ]
then
  printf "You failed to specify a valid operation.\n"
  printf "Valid operations are '%s', '%s', and '%s'.\n" "$INSPECT" "$CREATE" "$APPLY"
  exit 2
fi
```

There are only three operations that are defined in the context of this script,
so we make sure only those are coming in.

If something unknown is coming we try to be nice about it and show our user
the folly of their ways - and the way forward, too! =)

------------

```bash
# validate volume argument
if [ -z "$VOLUME" ]
then
  printf "You did not specify a data volume.\n"
  printf "Available volumes are:\n%s\n" "$(docker volume ls --quiet | grep --ignore-case --invert-match 'backup')"
  exit 2
fi
```

Since creating, applying and inspecting `volume` backups only makes when you
have, uhm, `volume`s, we make sure one is being specified here.

If it is not, we'll lay out the options for the user.

------------

```bash
# validate timestamp argument
if [ "$OPERATION" != "$CREATE" ] && [ -z "$TIMESTAMP" ]
then
  printf "You invoked the '%s' operation omitting the timestamp parameter; this is only allowed for the '%s' operation.\n" "$OPERATION" "$CREATE"
  printf "Available backup timestamps for this volume are:\n%s\n" "$(docker volume ls --quiet | grep --ignore-case "$VOLUME-backup-" | sed -E 's?(.+)(-backup-)(.+)?\3?g')"
  exit 2
elif [ "$OPERATION" = "$CREATE" ] && [ -z "$TIMESTAMP" ]
then
  TIMESTAMP="$(date +'%F')"
fi
```

In case our user is creating a new backup `volume` they may omit the timestamp -
we'll just go ahead and add one ourselves; seems sensible, honestly.

For applying and inspecting we really need to know what to apply or inspect,
so in those case we really required a proper timestamp.

As always, we'll list all the available options in this case.

------------

```bash
# we're done with validating arguments, let's be a bit stricter
# now in regards to unset variables
set -u
```

Now that we've put all this validating business behind us we can run on autopilot again. Kinda =)

#### Guardrails

```bash
# prepare volume access modifiers (read-only, read-write)
READONLY='ro'
READWRITE='rw'
LIVE_ACCESS="$READONLY"
BACKUP_ACCESS="$READONLY"
```

What happens if we write to the `volume` we were meant to read from? Yes, that is right, we die.
Or at the very least we're on the path to madness and sweaty palms.

So let's opt for more conservative defaults. Literally.

------------

```bash
if [ "$OPERATION" = "$CREATE" ]
then
  BACKUP_ACCESS="$READWRITE"
elif [ "$OPERATION" = "$APPLY" ]
then
  LIVE_ACCESS="$READWRITE"
fi
```

`Read-only` is all nice and well until you have to go and actually `write` something.
Who would've thunk. But we'll minimise the writeability at least, so that's nice.

------------

```bash
if [ "$OPERATION" = "$INSPECT" ]
then
# inspect
  docker run \
    -it \
    --rm \
    --volume "$VOLUME:/tmp/live:$LIVE_ACCESS" \
    --volume "$VOLUME-backup-$TIMESTAMP:/tmp/backup:$BACKUP_ACCESS" \
    --workdir '/tmp' \
    alpine:3.10
elif [ "$OPERATION" = "$CREATE" ]
then
# create
  docker volume create "$VOLUME-backup-$TIMESTAMP"
  docker run \
    -it \
    --rm \
    --volume "$VOLUME:/tmp/live:$LIVE_ACCESS" \
    --volume "$VOLUME-backup-$TIMESTAMP:/tmp/backup:$BACKUP_ACCESS" \
    --workdir '/tmp' \
    alpine:3.10 sh -c 'rm -rf /tmp/backup/* && cp -a /tmp/live/* /tmp/backup/'
elif [ "$OPERATION" = "$APPLY" ]
then
# apply
  docker run \
    -it \
    --rm \
    --volume "$VOLUME:/tmp/live:$LIVE_ACCESS" \
    --volume "$VOLUME-backup-$TIMESTAMP:/tmp/backup:$BACKUP_ACCESS" \
    --workdir '/tmp' \
    alpine:3.10 sh -c 'rm -rf /tmp/live/* && cp -a /tmp/backup/* /tmp/live/'
fi
```

And finally, we'll take all these sweet, sweet validated inputs and computed parameters
and turn them into the sort of boring `docker run` commands that we'd have
crafted ourselves otherwise. Or hadn't. Whatever.

### The where

Head over to the [Github repo](https://github.com/vyo/docker-volume-backup)
for an up to date version that you can download, fork, and raise issues for.

If you feel like it. You do you. Stay lovely!

