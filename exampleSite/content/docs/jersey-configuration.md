## Jersey configuration 
### Simple configuration
This will assume default configuration with no interceptor and Grizzly client
```java
resourceConfig.register(RxJerseyServerFeature.class);
resourceConfig.register(RxJerseyClientFeature.class);
```

### Detailed configuration
This configuration will add async request interceptor and override default client
```java
RxJerseyServerFeature rxJerseyServerFeature = new RxJerseyServerFeature()
        .register(AuthRequestInterceptor.class);

RxJerseyClientFeature rxJerseyClientFeature = new RxJerseyClientFeature()
        .register(client); // Should be non-blocking client implementation

resourceConfig.register(rxJerseyServerFeature);
resourceConfig.register(rxJerseyClientFeature);
```