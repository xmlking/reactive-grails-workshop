//= wrapped

angular
    .module("grangular.core")
    .component("navbar", {
        templateUrl: '/grangular/core/navbar.html',
        controller: NavbarController,
        controllerAs : 'vm'
    });

function NavbarController(AuthenticationService, LoginService, $state, ApplicationDataFactory) {
    var vm = this;

    vm.isLoggedIn = isLoggedIn;
    vm.getProfile = getProfile;
    vm.toggleNavbar = toggleNavbar;
    vm.login = login;
    vm.logout = logout;

    ApplicationDataFactory.get().then(function(response) {
        vm.applicationData = response.data;
    });


    function isLoggedIn() {
        return AuthenticationService.isLoggedIn();
    }

    function getProfile() {
        return AuthenticationService.getProfile()
    }

    function toggleNavbar() {
        vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
    }


    function login() {
        LoginService.open();
    }

    function logout() {
        AuthenticationService.logout().then(function(response) {
            $state.go('index', {}, { reload: true, inherit: false, notify: true})
        }).catch(function(error) {
            console.error('logout error status code',error.status);
            console.error('logout error statusText',error.statusText);
        });
    }
}