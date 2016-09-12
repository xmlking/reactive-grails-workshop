//= wrapped

angular
    .module("grangular.core")
    .controller("LoginController", LoginController);

function LoginController ($rootScope, $state, $timeout, AuthenticationService, $uibModalInstance) {
    var vm = this;

    vm.authenticationError = false;
    vm.user = {};
    vm.cancel = cancel;
    vm.login = login;
    vm.register = register;
    vm.requestResetPassword = requestResetPassword;


    function cancel () {
        vm.authenticationError = false;
        AuthenticationService.loginCancelled();
        $uibModalInstance.dismiss('cancel');
    }

    function login (user) {
        AuthenticationService.login(user).then(function (result) {
            vm.authenticationError = false;
            $uibModalInstance.close(result);

            console.log('destination State', $rootScope.destinationState);
            // redirect to view that is requested before 401/403 error occurred.
            if ($rootScope.destinationState) {
                $state.go($rootScope.destinationState.state.name, $rootScope.destinationState.stateParams);
            } else {
                $state.go('index', {}, { reload: true, inherit: false, notify: true})
            }

        }).catch(function (error) {
            vm.authenticationError = true; // TODO: set server error i.e., account lockout???
            console.error('login error status code',error.status);
            console.error('login error statusText',error.statusText);
        });
    }

    function register () {
        AuthenticationService.loginCancelled();
        $uibModalInstance.dismiss('cancel');
        $state.go('register');
    }

    function requestResetPassword () {
        AuthenticationService.loginCancelled();
        $uibModalInstance.dismiss('cancel');
        $state.go('requestReset');
    }
}


