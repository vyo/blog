If you have, for one reason or another, the need to define custom sorting behaviour on your Spring Data JPA repos, you may have noticed that there is a dedicated flag for `NullHandling`.

```kotlin
Sort.Order(
        Sort.DEFAULT_DIRECTION,,
        MyEntity::myField.name,
        Sort.NullHandling.NULLS_LAST
        )
```

But it's a lie. You can specify it, but the underlying JPA spec makes no guarantee as to how `NULL` value will be treated and you have to check with the specific datastore you're using.

Postgres puts `NULLS FIRST` on string comparisons, for example. Which is just weird...

See this [Spring Data JPA issue](https://github.com/spring-projects/spring-data-jpa/issues/1280) and this [JPA API issue](https://github.com/eclipse-ee4j/jpa-api/issues/76) for details.

