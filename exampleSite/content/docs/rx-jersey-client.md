## RxJersey Proxy Client

Proxy client provides convenient way to call resources without constructing request. Also it allows to reuse resource interfaces between microservices.

In order to enable RxJava in proxy client register Jersey feature
```java
RxJerseyClientFeature rxJerseyClientFeature = new RxJerseyClientFeature()
        .register(client); //should be non-blocking client implementation
resourceConfig.register(rxJerseyClientFeature);
```
Default client with Grizzly connector will be used if not provided


## Remote resource injection
You can inject proxy client with `@Remote` annotation, in addition you can inject `WebTarget` or `RxWebTarget`
```java
@Path("/example/")
public class GithubResource {

    @Remote("https://api.github.com/")
    private GithubApi githubApi;

    @Remote("https://api.github.com/")
    private WebTarget webTarget;

    @GET
    @Path("github")
    public Single<GithubRepository> getRepository() {
        return githubApi.getRepository("alex-shpak", "rx-jersey").toSingle();
    }
}
```

## Manual proxy client creation
You can use `WebResourceFactory` from `net.winterly.rxjersey.client` package in order to create proxy client

#### RxJava
```java
WebResourceFactory.newResource(
        ResourceInterface.class,
        rxWebTarget,
        new ObservableClientMethodInvoker()
);
```
#### RxJava 2
```java
WebResourceFactory.newResource(
        ResourceInterface.class,
        webTarget,
        new FlowableClientMethodInvoker()
);
```

## Url resolving
Below is example of URL merging based on `@Remote` annotation value

| Annotation Value              | Jersey Context Path         | Result URL                   |
| ----------------------------- | --------------------------- | ---------------------------- |
| @Remote("http://example.com") | http://baseurl.com/resource | http://example.com/          |
| @Remote("/resource/")         | http://baseurl.com/some     | http://baseurl.com/resource/ |