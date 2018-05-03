So I'll have a go at this blogging thingymabobs that I'm late to by about two decades and pen down my thoughts and ramblings.
You may expect mostly code with a dash of non-content here and there. Since 'you' will be comprised mainly of 'future me' this whole
thing will most probably resemble a giant dump of code snippet post-its.
The occasional rant, cat content, and esoteric music recommendation notwithstanding. Consider yourself warned.

For now I'll just a leave a teaser for things to come:

```kotlin
interface FeatureFlag {
  fun isActive(): Boolean
}

interface FeatureToggle<out R> : Function<R>

fun tuple() {}

fun doAThing() {
  val feature = toggle(Feature.A, on = { -> println("A") }, off = { -> println("not A") })
  feature()
}
```

