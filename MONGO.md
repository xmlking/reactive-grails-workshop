MongoDB
=======
Setup MongoDB 

### Install MongoDB

```bash
brew install mongodb
```

### Start MongoDB

```bash
mongod -f ./data/mongod.yml
```

### Secure MongoDB

Create an admin user

```bash
# Open your `mongo` shell and switch to the `admin` database
mongo
use admin
# Create the “admin” user
db.createUser(
   {
     user: "admin",
     pwd: "admin123",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" }]
   }
)
```

Enable authentication in the `data/mongod.yml` file

```yml
security:
	authorization: enabled
```

Restart `mongod`

```bash
mongod -f ./data/mongod.yml
```

Now switch to `grangular` database and create app owner user.

```bash
# Open your `mongo` shell and switch to the `grangular` database
mongo --port 27017 -u "admin" -p "admin123" --authenticationDatabase "admin"
use grangular
# Create the “grails” user
db.createUser(
   {
     user: "grails",
     pwd: "grails123",
     roles: [ { role: "dbOwner", db: "grangular" } ]
   }
)
show users
```
 
Now check that everything went fine with the auth function.

```bash
# Open your `mongo` shell and switch to the `grangular` database
mongo --port 27017 -u "grails" -p "grails123" --authenticationDatabase "grangular"
use grangular
show collections
db.foo.insert( { x: 1, y: 1 } )
show collections
```
 


### Ref:
https://medium.com/@matteocontrini/how-to-setup-auth-in-mongodb-3-0-properly-86b60aeef7e8#.6k4d5csgs