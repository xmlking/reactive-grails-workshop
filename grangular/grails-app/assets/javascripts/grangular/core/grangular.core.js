//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /angular/angular-jwt
//= require /angular/angular-storage
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree interceptors
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("grangular.core", ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-storage', 'angular-jwt'])
    .constant("contextPath", window.contextPath)
    .config(config)
    .config(router)
    .run(run);

function config(jwtInterceptorProvider, jwtOptionsProvider, $httpProvider) {

    jwtOptionsProvider.config({

        //TODO: add prod domains
        whiteListedDomains: ['api1.myapp.com', 'localhost'],

        unauthenticatedRedirector: ['AuthenticationService', function(AuthenticationService) {
            /* Leave this block empty, as we are using  AuthenticationService.redirectWhenUnAuthenticated() */
        }],

        /*
         TODO : https://github.com/auth0/angular-jwt/issues/92

         tokenGetter:  ['options', 'AuthenticationService', function(options, AuthenticationService) {
         return AuthenticationService.getToken(options);
         }]
         */

        tokenGetter:  [ 'AuthenticationService', function(AuthenticationService) {
            return AuthenticationService.getToken();
        }]

    });


    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    //NOTE: Order Important i.e., jwtInterceptor at the end.
    $httpProvider.interceptors.push('HttpRequestInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('jwtInterceptor');
}

function run($rootScope, authManager, $timeout, AuthenticationService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //For redirecting to view that is requested before 401/403 error fired.
        $rootScope.destinationState = {state: toState, stateParams: toParams};
        //To be used for UI back button //won't work when page is reloaded.
        $rootScope.originState = {state: fromState, stateParams: fromParams};

        // var allowAnonymous = (
        // typeof toState.access === 'undefined' ||
        // typeof toState.access.allowAnonymous === 'undefined') ? true : toState.access.allowAnonymous;
        //
        // if(!allowAnonymous || !AuthorizationService.isAuthorized(getProfile(), toState, toParams)) {
        //     event.preventDefault();
        //     AuthenticationService.notAuthorized();
        //     return;
        // }

        //has to be last statement in this event handler.
        $rootScope.spinner = true;
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.spinner = false;
        // $rootScope.destinationState = false;
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log('Some service has failed: ', error.config ? error.config.url : error);
    });

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
    AuthenticationService.redirectWhenUnAuthenticated();
    AuthenticationService.redirectWhenUnAuthorized();
    AuthenticationService.redirectWhenSessionTimeout();
}


function router($stateProvider) {
    $stateProvider
        .state('error', {
            url: '/error',
            templateUrl: '/grangular/core/error.html'
        })
        .state('accessdenied', {
            url: '/accessdenied',
            templateUrl: '/grangular/core/accessdenied.html'
        });
}
