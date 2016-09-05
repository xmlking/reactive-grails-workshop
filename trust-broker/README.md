Trust Broker
============

Multi Identity Provider / Broker - take username/password, APIKey, Facebook or Google identity; issue **JSON Web Token.**


### Features 

1. Provide `granular security` and `multitenancy` for your SaaS APIs.
2. Support pluggable authenticate strategies ranging from 
    1. verifying a username and password with DB or LDAP
    2. delegated authentication using OAuth or 
    3. federated authentication using OpenID Connect.
3. Account locking 
    1. user's account will be "locked" after some number of consecutive failed login attempts.
    2. user's account will become unlocked once a sufficient amount of time has passed.
    3. system will expose the reason for a failed login attempt to the application.


### Run
```bash
grails
grails> run
```

To get a token, make a request to the login endpoint provided by the plugin:

```bash
curl -i -H "Content-Type: application/json" --data '{"username":"basic3","password":"basic123"}' 0:8080/api/login
```
Verify access_token with https://jwt.io/
> default secret : qrD6h8K6S9503Q06Y6Rfk21TErImPYqa

Copy the access_token part of the response, and make a request to the original endpoint, passing the token in a header:

```bash
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...." 0:8080/api/books
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...." 0:8080/api/test
```

curl -i -H "Authorization: Bearer " 0:8080/api/books
