//= wrapped

angular
    .module("grangular.book")
    .controller("BookListController", BookListController);

function BookListController(Book, bookList) {
    var vm = this;

    // var max = 10, offset = 0;
    //
    // Book.list({max: max, offset: offset}, function(data) {
    //     vm.bookList = data;
    // });

    vm.bookList = bookList;
}
