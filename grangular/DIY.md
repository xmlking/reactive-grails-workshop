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
generate-rx-all Todo
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
https://grails-plugins.github.io/grails-rxjava/latest/
http://gorm.grails.org/snapshot/rx/manual/index.html
http://mrhaki.blogspot.com

