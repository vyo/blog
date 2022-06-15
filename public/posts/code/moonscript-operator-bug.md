While working on my collection of personal time-tracking helper scripts - codname `punch` - I stumbled over what I thought to be a weird bug in `moonscript`'s convenience operators, e.g. `+=`, `-=` and the like.

## TL;DR

It's not a bug in `moonscript` but arguably a glitch in `lua`.


## Lua: Tables. Tables everywhere

One of `lua`'s many comfy features is that everything that is not a primitive type is a table - an indexed array and key/value map all rolled into one.

By default arithmetic operators such as `+` and `-` don't apply for tables, it's undefined behaviour.
Trying to perform arithmetic on a table will result in an error.

```lua
local table_1 = {
    value = 1
}
local table_2 = {
    value = 2
}

table_1 = table_1 + table_2
```

```
attempt to perform arithmetic on local 'table_1' (a table value)
```

It is possible, however, to define how any given table should behave when confronted with an arithmetic operator.

In `lua` this is done by associating a table with a so-called `metatable` which provides functions for operators to tap into.
In code, this might look something like this:

```lua
local custom_metatable = {
    __add = custom_add,
    __sub = custom_sub,
    __eq = custom_eq
}

local table_1 = {}
local table_2 = {}

setmetatable(table_1, custom_metatable)
setmetatable(table_2, custom_metatable)

table_1 = table_1 + table_2
```

## Moonscript turning the table

`moonscript`'s main draw is its conciseness, removing a lot of `lua`'s verbose syntax, and adding a bunch of convenience features, such as combined arithmetic and assignment operators such as `+=`, `-=`, etc.

This line in `lua`

```lua
table_1 = table_1 + table_2
```

can be written like this in `moonscript`:

```moon
table_1 += table_2
```

And it works!


## Until it doesn't

To be precise, this sort of table arithmetic works, as long the right-hand side of the operation is a table.

If we try to use an expression on the right-hand side, e.g. another table addition that would resolve to a table, `lua` complains:

```moon
table_1 += table_2 + table_2
```
```
attempt to perform arithmetic on local 'table_1' (a table value)
```

I thought this might be a `moonscript` issue, but the equivalent `lua` code exhibits the same behaviour:

```lua
table_1 = table_1 + table_2 + table_2
```
```
attempt to perform arithmetic on local 'table_1' (a table value)
```

Weird but comprehensible. Kind of. But still weird.
