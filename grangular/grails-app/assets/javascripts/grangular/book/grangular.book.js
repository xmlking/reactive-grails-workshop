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

angular.module("grangular.book", ["ui.router", "ngResource", "grangular.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('book', {
            url: "/book",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('book.list', {
            url: "",
            templateUrl: "/grangular/book/list.html",
            controller: "BookListController as vm",
            resolve: {
                bookList: function ($stateParams, Book) {
                    var max = 10, offset = 0;
                    return Book.list({max: max, offset: offset}).$promise;
                }
            }
        })
        .state('book.create', {
            url: "/create",
            templateUrl: "/grangular/book/create.html",
            controller: "BookCreateController as vm"
        })
        .state('book.edit', {
            url: "/edit/:id",
            templateUrl: "/grangular/book/edit.html",
            controller: "BookEditController as vm"
        })
        .state('book.show', {
            url: "/show/:id",
            templateUrl: "/grangular/book/show.html",
            controller: "BookShowController as vm"
        });
}
