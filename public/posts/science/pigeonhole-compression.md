A few days ago the topic of compression algorithms sometimes creating outputs
greater than their inputs came up - seems rather counterintuitive, doesn't it?
Naturally, I immediately blurted out `Pigeonhole Principle`, and proceeded to provide an
answer that wasn't entirely wrong, but not overly well articulated, either.
So let's try again.

I'll try and aim for accuracy but in the end this is more a mental post-it note of sorts,
so it'll probably be a bit light on the science, and heavy on the puns.

### Bookkeeping

First off, we'll have to define a bunch of terms so that we're on the same
page here:

 - `Set`: A bunch of things. Numbers, string sequences, marbles, cherries, baby elephants. Anything.
 - `Cardinality`: How many things there are in a given `Set`.
 - `Function`: A way to map all things from one `Set` onto things in another `Set`.
 - `Domain`: The source `Set` of a `Function`.
 - `Codomain`: The target `Set` of a `Function`.
 - `Injective`: No two distinct elements of the `Domain` map to the same element of the `Codomain`
 - `Surjective`: There is no element of the `Codomain` that doesn't have a corresponding `Domain` element.
 - `Bijection`: A `Function` that is both `Injective` and `Surjective`
 - `Reversible Function`: Make an educated guess. Also, it needs to be a `Bijection`.
 - `Compression`: A reversible `Bijection` from a `Set` of finite bit sequences onto itself.
 - `Hash`: A `Surjection` from a `Set` of finite bit sequences onto a `Set` of finite bit sequences of lower `Cardinality`.

Well, that's a pile of words right there...

Also, note that I didn't define compression as a function that, for any input,
provides an output that is shorter than its input. Or smaller, or whatever metric tickles your fancy.
We would assume it does, but it really, really doesn't. So we should steer clear of that for now.

### We're whating the what now?

So, to get an understanding of what a function compressing things actually does, we might turn to
looking at what we would like it to do:

 - accept any sort of finite (binary) data as input
 - give us an output that is (hopefully) smaller than our input
 - allow us to easily decompress that output back into its original form again

It's that last point that is the most interesting. Both in practice, and in theory, actually.
After all, if we don't care about getting our original data back
we might just as well delete it.

### Are we there, yet?

What do we need to make that happen? Not a lot - only a function that maps from the set of possible
inputs onto the set of possible outputs, while being nicely reversible.

The last bit means that it also must be a bijection:

It needs to be injective, otherwise we might
need to choose between multiple possible outputs for some inputs of our reversible function;
it's not as bad deleting the original data, but having to roll the dice on which reverse output
might be the original input isn't exactly a lot of fun, either.

It would be nice if it were surjective, too. Having not to worry whether our
reversible function can handle all the inputs we're throwing at
it isn't strictly necessary - look up `Partial Function`s if you are interested -
but it's a hassle we really don't want to concern ourselves with at the moment.

### Let's break it!

So, now every input has exactly one output - and vice versa - and all inputs and outputs
are from the same set of finite bit sequences.

Time to build ourselves our first compression algorithm! Don't worry, it's gonna
be terrible!

Let's keep our expectations really low for now and just make sure our algorithm
simply doesn't make things worse. In other words, we will map any input
to an output of the exact same length. Look up `Identity Function` if you need a
nudge as to how we would do that. For now the how isn't of much interest to us,
however.

Let's do one better: We'll map all inputs to outputs of the same length as the
corresponding input, except for one - that one we'll map to an output of smaller length.
Except we can't - if we use the Identity Function the only output left is equal
to our input. Bummer.   
So, we'll just free up a spot by exempting two inputs from our conservative rule -
and we'll use ones of different length.   
So now we can take the longer input and map it to the shorter output - yes!, and then
we simply take the remaining shorter input and map it to the longer - aww, snap!

You can go and try and free up more pairs; it won't change the fundamental
problem, however =(

### Proof?

Now we have a bit of an intuition for the problem, but that still isn't proof.

Let's aim a bit higher, for a moment, and assume we could build an algorithm
that is able to transform all inputs of an arbitrary, yet fixed length to an
output of strictly smaller length - let's say shorter by one; time to get mathy.

We are operating on binary data of a fixed length, let's call it `n`,
so we can define our input domain as the set of all possible binary sequences
of length `n`. The number of possible combinations is `2**n`, so the cardinality
of our domain is `2**n`, too.   
Our outputs are supposed to be shorter, so let's not overdo it and say they have length
`n-1`; this would make their cardinality `2**(n-1)`.

Definitions, again:   
`Totality`: For all elements `a` out of the domain there exists an element `b` in its codomain such
that `f(a) = b`. (here for completeness only, this is a necessary attribute of any function)   
`Injection`: For all elements `a`, `b` out of the domain it holds that `f(a) = f(b) => a = b`.

A different definition of `Cardinality`:

> A domain has the same or smaller cardinality
than its codomain if there exists an injection between the two.

Or, worded the other way around, as the `Pigeonhole Principle`:
> There is no injection from a domain into a codomain of smaller cardinality.

Or, colloquially:

> If you put 10 pigeons into 9 boxes, at least 2 pigeons will have to share a box.

### Paradox City

Let's have a look at how our made up compression function holds up in respect
to these definitions of cardinality, keeping in mind that, as per our definition:
 - our domain has higher cardinality than our codomain
 - our function is a bijection, thus injective.

This is in conflict with the pigeonhole principle: Our function can satisfy only
one or the other condition. Since our domain is bigger than our codomain by
virtue of definition and construction - go ahead and count for e.g. `n := 3` -
it follows that our assumption of our function being injective must be false.

This means that our compression function is not universally reversible,
that is there are inputs that can be compressed, but not uniquely decompressed.   
In other words: Such a universal compression function can not exist.

There's another path to the same conclusion, ignoring cardinality altogether:

Let's assume there is a function that reversibly compresses any input of length
`n` to an output of length `n-1`. Then you could repeatedly apply such a function
to any input, reducing its length by `1` with every step, reducing it down to
length `0` in the end. Then uniquely decompressing literally nothing back to any
original input is contradictory to our everyday experience, to say the least.

Try and explain to your mom how you compressed your childhood photographs to length 0,
I'll stay here and wait.

### Compression, please?

So let's settle for a non-universal compression function, you might say.
How bad could it possibly be? 

Well, first we'll answer the `how`, then the `how bad`.

We'll use the imaginary ideal compression function we used before
and take it from there: Map any input of length `n` to an output of length `n-1`

Wait a minute, you might say! Didn't we show earlier that we can't do that
for all inputs of length `n` or our function won't be injective anymore?   
Right! So if we play it safe and map only as many inputs of our length `n` set
as we have outputs available in our `n-1` length set,
we end up with a bunch of inputs that will be left over?   
Right again! How many? That's easy actually, it's simply the difference in
cardinality between domain and codomain:
`2**n - 2**(n-1)`.

Looks funny. But wait, that's simple yet again:
It's `2**(n-1)`, or `(2**n) / 2`, that is, half of `2**n`!
We're missing out on exactly as many inputs as we're able to assign!

Let's visualise it real quick for `n := 3`:

```md
the numbers denote the respective input and output lengths
each number represents a domain/codomain element

domain     -->  codomain

   0
   1    1  -->  0
  22   22  -->  11
3333 3333  -->  2222
                33333333
```

Summing up all these leftovers, that is half of the set of length `n`,
that is `2**(n-1` elements, with the half the of next smaller one,
being `2**(n-2)` elements, might remind you of a particular series of
summations.

Hint: You can equivalently write those sum parts as follows:
`(2**n)/2`, `(2**n)/4`, `(2**n)/8`, `...`   
Yep, the `Geometric Series`. And what does that one converge towards? `1`.
Or, in our case, `2**n`. Have a peek at our visualisation, how many elements
do we still have unassigned and available in our codomain? Yep, `2**n`.

So we have exactly sufficiently enough elements left in our codomain to
ensure our compression function can be injective. Even nicer, since we
assigned all elements in our codomain, it's surjective, too!
Which gives us a nice reversible bijection. Just what we wanted! Yay!

### Is it good, though?

But is it a good compression function? Yes, and no. We have achieved true
compression for full half of all possible inputs, for an arbitrary length `n`!
That's really nice, actually.   
We do not compress by much, however, only reducing the length by `1`.
Granted, we can apply our compression function repeatedly; it's still a bit meh.   
Furthermore, the other half of inputs doesn't only get a little bit bigger,
it gets inflated to the full length `n`, regardless of the length of the input.   
Ouch.

And while that is a real bummer, it might serve to inspire in you some curiosity
and respect for the compression levels of some of the compression algorithms out there.
