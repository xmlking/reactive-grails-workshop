//= wrapped

angular
    .module("grangular.login")
    // .factory('authInterceptor', function ($rootScope, $window) {
    //     return {
    //         request: function (config) {
    //             config.headers = config.headers || {};
    //             if ($window.sessionStorage.token) {
    //                 config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
    //             }
    //             return config;
    //         }
    //     };
    // })
    // .config(function ($httpProvider) {
    //     $httpProvider.interceptors.push('authInterceptor');
    // })
    .controller("LoginController", LoginController);

// function LoginController1($http, $window) {
//     var vm = this;
//
//     vm.login = function () {
//         $http.post('http://localhost:9080/api/login', {
//             username: vm.user.username,
//             password: vm.user.password
//         }).then(function (response) {
//             vm.authenticated = true;
//             $window.sessionStorage.token = response.data.access_token;
//         });
//     };
//
// }

function LoginController($scope, UserService, $http, store, $stateParams, $state) {

    this.user = {};
    var self  = this;
    this.login = function(user) {
        UserService.login(user)
            .then(function(response) {
                if ($stateParams.redirect) {
                    $state.go($stateParams.redirect)
                } else {
                    $state.go('index')
                }
            });
    }

}