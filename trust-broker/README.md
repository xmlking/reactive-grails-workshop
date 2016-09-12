Trust Broker
============

Multi Identity Provider / Broker - take username/password, APIKey, Facebook or Google identity; issue **JSON Web Token.**
Provide `granular security` and `multitenancy` for your SaaS APIs.

### Features

- [x] JSON Web Tokens
- [x] CORS Enabled
- [x] Multi-tenancy AuthN for your SaaS APIs.
- [x] Custom *UserDetailsService* for Multi-Tenancy
- [ ] Support pluggable authenticate strategies ranging from 
    - [x] Verifying a username and password with DB or LDAP 
    - [ ] Delegated authentication using OAuth.
    - [ ] Federated authentication using OpenID Connect.
- [ ] Account locking 
    - [ ] user's account will be "locked" after some number of consecutive failed login attempts.
    - [ ] user's account will become unlocked once a sufficient amount of time has passed.
    - [ ] system will reply the reason for a failed login attempt to the application.


#### Setup

1. Make sure [MongoDB](../MONGO.md) is running
2. Start Trust Broker Grails App

#### Run  

```bash
cd trust-broker
grails
grails> run
# Grails application running at http://localhost:9080 in environment: development
grails> stop
```

#### Test
To get a token, make a request to the login endpoint provided by the plugin:

```bash
# For ROLE_USER
curl -i -H "Content-Type: application/json" --data '{"username":"basic3","password":"basic123"}' 0:9080/api/login
# For ROLE_ADMIN
curl -i -H "Content-Type: application/json" --data '{"username":"admin","password":"admin123"}' 0:9080/api/login
```

Verify access_token with https://jwt.io/
> default secret : qrD6h8K6S9503Q06Y6Rfk21TErImPYqa

Copy the access_token part of the response, and make a request to the original endpoint, passing the token in the header:

```bash
# Try with ROLE_ADMIN token
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...." 0:9080/api/users
# Try with ROLE_USER token or ROLE_ADMIN token
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...." 0:9080/api/test
```

#### Build

#### Deploy



