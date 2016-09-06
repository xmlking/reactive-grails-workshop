//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /grangular/core/grangular.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("grangular.login", ["ui.router", "ngResource", "grangular.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            params: {
                redirect: null
            },
            templateUrl: "/grangular/login/login.html",
            controller: "LoginController as vm"
        });
}