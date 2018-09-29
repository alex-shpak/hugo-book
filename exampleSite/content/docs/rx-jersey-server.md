## Jersey Server
Register `RxJerseyServerFeature` in `resourceConfig`
```java
resourceConfig.register(RxJerseyServerFeature.class);
```
Or with configuration
```java
RxJerseyServerFeature rxJerseyServerFeature = new RxJerseyServerFeature()
                .register(AuthInterceptor.class);

resourceConfig.register(rxJerseyServerFeature);
```

Update your resource adding rx return type:
```java
@Path("/")
public class HelloResource {

    @GET
    public Single<HelloEntity> getAsync() {
        return Single.just(new HelloEntity());
    }


    public static class HelloEntity {
        public String hello = "world";
    }
}
```

## Inteceptor
You can use RxJava enabled interceptors. Result of such interceptor will be ignored. Thrown or returned error would be redirected to jersey.

#### RxJava
```java
public class SimpleInterceptor implements ObservableRequestInterceptor<Void> {
    public Observable<Void> intercept(ContainerRequestContext requestContext) {
        return Observable.empty();
    }
}
```

#### RxJava 2
```java
public class SimpleInterceptor implements CompletableRequestInterceptor {
    public Completable intercept(ContainerRequestContext requestContext) {
        return Observable.complete();
    }
}
```


## Important notes
#### RxJava
 - It's recommended to use `rx.Single` as return type (Representing single response entity).
 - Multiple elements emitted in `Observable` will be treated as error.
 - Empty `Observable` or `null` value in `Observable` or `Single` will be treated as `204: No content`.
 - `Completable` will be executed and `204: No content` will be returned.

#### RxJava 2
 - It's recommended to use `io.reactivex.Maybe` which could be 0 or 1 item or an error.
 - Multiple elements emitted in `Observable` or `Flowable` will be treated as error.
 - Empty `Observable`/`Maybe` will be treated as `204: No content`.
 - `Completable` will be executed and `204: No content` will be returned.
