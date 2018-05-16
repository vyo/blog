Versioning REST APIs, the endless point of contention.

```kotlin
/**
 * Doin' it wrong in 3 different ways. Twice. You're welcome.
 *
 * Heavily inspired by https://www.troyhunt.com/your-api-versioning-is-wrong-which-is/
 */
@RestController("/hello")
class HelloWorld(val v2Default: FeatureFlag,
                 @Feature("v2Default") val v2DefaultFlag: FeatureFlag,
                 @Value("\${feature-flags.v2Default}") val v2DefaultProp: Boolean) {

    @GetMapping("/{name}")
    fun hello(@PathVariable("name") name: String?,
              @RequestHeader("Accept") accept: String?,
              @RequestHeader("api-version") version: String?): String {

        val hello = when {
            accept?.isNotBlank() ?: false && accept != "*/*" && accept != "application/json"
            -> toggle({ accept == "application/v2+json" }, ::echo, ::simple)
            version?.isNotBlank() ?: false
            -> toggle({ version == "v2" +
                    "" }, ::echo, ::simple)
            else
            -> toggle(v2Default, ::echo, ::simple)
        }

        return hello(tuple(name ?: ""), void())
    }

    fun simple(): String {
        return "Hello!"
    }

    fun echo(name: String): String {
        return name.reversed()
    }

}
```
