//= wrapped
//= require /angular/angular-resource

angular
    .module("grangular.book")
    .factory("Book", Book);

function Book($resource) {
    var Book = $resource(
        "api/books/:id",
        {"id": "@id"},
        {"update": {method: "PUT"},
         "query": {method: "GET", isArray: true},
         "get": {method: 'GET'}}
    );

    Book.list = Book.query;

    Book.prototype.toString = function() {
        return 'grangular.Book : ' + (this.id ? this.id : '(unsaved)');
    };

    return Book;
}
