//= wrapped

angular
    .module("grangular.index")
    .controller("IndexController", IndexController);

function IndexController(contextPath, $state, store, jwtHelper, ApplicationDataFactory) {
    var vm = this;

    vm.contextPath = contextPath;

    ApplicationDataFactory.get().then(function(response) {
        vm.applicationData = response.data;
    });

    vm.stateExists = function(name) {
        return $state.get(name) != null;
    };

    vm.username = store.get('profile') ? store.get('profile').username : undefined;
    vm.jwt = store.get('token');
    vm.decodedJwt = this.jwt && jwtHelper.decodeToken(this.jwt);

}
