Re-committing to adjust author/committer meta data - with minimal hassle, that is.

So, you contribute to a bunch of different repos, using different user names and mail addresses - or even
sign them with different GPG keys - and of course you mix it up at the worst possible time.
Now your private mail is all over your work repo and that simply does not fly.

Bummer. Skip right to the end if you just want to be done with it.

Soooooo let's just rewrite all those parts of the history that have been commited with what's basically
the wrong git settings. The way to go - if it's not only the single last commit, for which case `git amend`
will always have your back - is to use interactive rebasing, with a bit of editing and `git commit --amend`.

Only that we have already done all that committing and writing messages stuff and would much rather not be
bothered with the whole commit message nonsense again. And with this, the solution:

```sh
git rebase --interactive $FIRST_COMMIT

# rinse/repeat the next two steps until done
git commit --amend --gpg-sign="$GPG_CURRENT_KEY" --reset-author --no-edit
git rebase --continue
```
