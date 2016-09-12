//= wrapped

angular
    .module("grangular.core")
    .service("LoginService", LoginService);

function LoginService ($uibModal) {
    var vm = this;

    vm.open = open;

    var modalInstance = null;
    var resetModal = function () {
        modalInstance = null;
    };

    function open () {
        if (modalInstance !== null) return;
        modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/grangular/core/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        modalInstance.result.then(
            resetModal,
            resetModal
        );
    }
}