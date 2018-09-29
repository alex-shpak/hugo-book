## Dropwizard configuration 

Use provided `RxJerseyBundle`
```java
@Override
public void initialize(Bootstrap<RxJerseyConfiguration> bootstrap) {
    bootstrap.addBundle(new RxJerseyBundle<RxJerseyConfiguration>()
            .setClientConfigurationProvider(config -> config.client)
            .register(HeaderInterceptor.class)
    );
}
```

Alternatively you can directly configure and register Jersey feature
```java
public void run(RxJerseyConfiguration configuration, Environment environment) throws Exception {
    JerseyEnvironment jersey = environment.jersey();

    Client client = new JerseyClientBuilder(environment)
            .using(configuration.client)
            .using(new GrizzlyConnectorProvider())
            .buildRx("Client", RxObservableInvoker.class);

    RxJerseyServerFeature rxJerseyServerFeature = new RxJerseyServerFeature()
            .register(HeaderInterceptor.class);

    RxJerseyClientFeature rxJerseyClientFeature = new RxJerseyClientFeature()
            .register(client);

    jersey.register(rxJerseyServerFeature);
    jersey.register(rxJerseyClientFeature);
}
```

#### [See example](https://github.com/alex-shpak/rx-jersey/tree/master/example) for more information