//= wrapped

angular
    .module("grangular.book")
    .controller("BookShowController", BookShowController);

function BookShowController(Book, $stateParams, $state) {
    var vm = this;

    Book.get({id: $stateParams.id}, function(data) {
        vm.book = new Book(data);
    }, function() {
        $state.go('book.list');
    });

    vm.delete = function() {
        vm.book.$delete(function() {
            $state.go('book.list');
        }, function() {
            //on error
        });
    };

}
