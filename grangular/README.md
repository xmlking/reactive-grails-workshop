GrAngular
=========
Demo app to showcase Grails's end-to-end reactive capability.

RxJS(Angular) ->  Reactive Controller ->  RxGORM -> MongoDB

### Features

1. Showcase how *Grails* can be used for *Multi-Tenancy*, *Resiliency* and *Reactive*
    - [x] SaaS style REST APIs
    - [x] Multi-Tenancy Modes:  DISCRIMINATOR
    - [x] RxGORM with MongoDB
    - [x] CORS Enabled
    - [x] Reactive Controller
    - [x] RxGORM with MongoDB
    - [x] Custom [Properties](grails-app/conf/application.yml#L6)
    - [x] Custom Banner 
2. *Single Page Application(SPA)* front-end app.
    - [x] Angular 1.5
    - [ ] Angular 2.0
 

#### Setup

1. Make sure [MongoDB](../MONGO.md) is running
1. Make sure [Trust Broker](../trust-broker/) is running
2. Start GrAngular Grails App

#### Run

```
cd grangular
grails
grails> run
Grails application running at http://localhost:8080 in environment: development
grails> stop
```

#### Test
To get a token, make a request to the **Trust Broker's** *login endpoint*:

```bash
curl -i -H "Content-Type: application/json" --data '{"username":"basic3","password":"basic123"}' 0:9080/api/login
```

Verify access_token with https://jwt.io/
> default secret : qrD6h8K6S9503Q06Y6Rfk21TErImPYqa

Copy the access_token part of the response, and make a request to the **GrAngular's** *todos endpoint*, passing the token in the header:

```bash
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...." 0:8080/api/todos
curl -i  0:8080/api/guest/stream
```


#### Build

#### Deploy
