Do it yourself - GrAngular
==========================

### Create App
```
grails create-app grangular --profile angular --features rx-mongodb,json-views,asset-pipeline,security
```
 
### Setup
```
cd grangular
grails 
# at grails prompt: Generate Todo domain, controller and views
create-domain-class Todo
# modifiy 'Todo' class to implements RxMongoEntity<Todo>
generate-rx-all Todo
# Generate Angular artifacts for Todo
ng-generate-all grangular.Todo 
# Repete above commands for 'Book'
```


### Info 
```
# List available profiles
grails list-profiles
# Getting More Information About A Profile
grails profile-info angular
# list URL Mappings
url-mappings-report
```


Ref:
1. RxJava: https://grails-plugins.github.io/grails-rxjava/latest/
2. RxGORM http://gorm.grails.org/rx/latest/
3. Grails Angular:  http://grails-plugins.github.io/grails-angular-scaffolding/latest/
4. alvarosanchez's workshop: http://alvarosanchez.github.io/grails-angularjs-springsecurity-workshop/
4. http://mrhaki.blogspot.com

