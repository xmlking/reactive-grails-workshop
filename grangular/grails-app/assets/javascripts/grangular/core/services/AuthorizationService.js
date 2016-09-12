//= wrapped

angular
    .module("grangular.core")
    .service("AuthorizationService", AuthorizationService);

function AuthorizationService($state) {
    var vm = this;

    vm.isAuthorized                   = isAuthorized;

    function isAuthorized(profile, toState, toParams) {
        //TODO: implement
        return true;
    }
}