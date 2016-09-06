//= wrapped

angular
    .module("grangular.core")
    .component("header", {
        templateUrl: '/grangular/core/header.html',
        controller: HeaderController,
        controllerAs : 'ctrl',
        bindings: {
            hero: '='
        }
    });

function HeaderController($scope, UserService, $state, store, applicationDataFactory) {
    var self = this;

    this.getProfile = function () {
        return UserService.getProfile();
    };

    this.isLoggedIn = function () {
        return UserService.isLoggedIn();
    };

    this.logout = function () {
        UserService.logout()
            .then(function(response) {
                $state.go('login')
            });
    };

    applicationDataFactory.get().then(function(response) {
        self.applicationData = response.data;
    });
}