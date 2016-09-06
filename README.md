Reactive Grails Workshop
========================

Showcase how to use *JSON Web Tokens(JWT)* to secure federated SaaS APIs, deployed as *Microservices*.

- [x] End-to-End Reactive Programming. 
- [x] Event-Driven Microservices
- [ ] Deploy and scale with Docker.
- [ ] Cloud-Native [12-factors](https://12factor.net/) implementation with **Spring Cloud**.


### Prerequisite
1. Install Gradle 3.0 via [SDKMAN](http://sdkman.io/)
2. Install Grails 3.2.0 RC1 via [SDKMAN](http://sdkman.io/)


### Start Order
1. Start [MongoDB](./MONGO.md)
2. Start [Trust Broker](./trust-broker/) (gradle trust-broker:bootRun)
3. Start [GrAngular](./grangular/) (gradle grangular:bootRun)