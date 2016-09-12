//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /angular/angular-ui-router
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

angular.module("grangular.index", [
    "grangular.core",
    "ui.router"
])
.config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: "/",
            controller: "IndexController as vm",
            templateUrl: "/grangular/index/index.html"
        });

    $urlRouterProvider.otherwise('/');
}
