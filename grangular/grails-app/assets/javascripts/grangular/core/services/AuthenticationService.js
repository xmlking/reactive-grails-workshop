//= wrapped

const CONFIG =
{
    backendUrl: 'http://localhost:9080'
};

const AUTH_EVENTS =
{
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    refreshTokenFailed: 'auth-refresh-token-failed',
    loginCancelled: 'auth-login-cancelled',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    unAuthenticated: 'unauthenticated',
    unAuthorized: 'auth-forbidden'
};

angular
    .module("grangular.core")
    .constant("CONFIG", CONFIG)
    .constant("AUTH_EVENTS", AUTH_EVENTS)
    .service("AuthenticationService", AuthenticationService);

function AuthenticationService($http, CONFIG, AUTH_EVENTS, HttpBuffer, $state, LoginService, AuthorizationService, $rootScope, $httpParamSerializer, store, jwtHelper) {
    var vm = this;

    vm.isLoggedIn                   = isLoggedIn;
    vm.getProfile                   = getProfile;
    vm.login                        = login;
    vm.logout                       = logout;
    vm.logoutNext                   = logoutNext;
    vm.getToken                     = getToken;
    vm.loginSuccess                 = loginSuccess;
    vm.loginCancelled               = loginCancelled;
    vm.redirectWhenUnAuthenticated  = redirectWhenUnAuthenticated;
    vm.redirectWhenUnAuthorized     = redirectWhenUnAuthorized;
    vm.redirectWhenSessionTimeout   = redirectWhenSessionTimeout;

    function _store(oToken, rememberMe) {
        var profile = {};
        profile.username = oToken.username;
        profile.roles = oToken.roles;
        store.set('token', oToken.access_token);
        store.set('refreshToken', oToken.refresh_token);
        store.set('profile', profile);
        store.set('rememberMe', rememberMe);
    }

    function _clear() {
        store.remove('profile');
        store.remove('token');
        store.remove('refreshToken');
        store.remove('rememberMe');
    }

    function isLoggedIn() {
        return (store.get('profile') && store.get('profile') !== undefined)
    }

    function getProfile() {
        return store.get('profile');
    }

    function login(credentials) {
        var data = {
            username: credentials.username,
            password: credentials.password,
            rememberMe: credentials.rememberMe
        };
        return $http({
            url: CONFIG.backendUrl +'/api/login',
            skipAuthorization: true,
            method: 'POST',
            data: data
        })
        .then(function(response) {
            _store(response.data, data.rememberMe || false);
            loginSuccess(response.data.username, function(config) {
                config.headers["Authorization"] = "Bearer " +response.data.access_token;
                return config;
            })
        })
    }


    function logout() {
        return new Promise( function (resolve, reject) {
            _clear();
            resolve(true);
        });
    }

    // when using custom JWT backend
    function logoutNext() {
        return $http({
            url: CONFIG.backendUrl +'/api/logout',
            method: 'POST'
        }).then(function(response) {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, response);
            _clear();
        })
    }

    // refresh token if needed.
    function getToken() {
        // TODO: Sending Different Tokens Based on URLs
        // TODO: Skip authentication for any requests ending in .html
        // if (options.url && options.url.endsWith('.html')) {
        //     return null;
        // }

        var token = store.get('token');
        var rememberMe = store.get('rememberMe');
        if (token && rememberMe && jwtHelper.isTokenExpired(token)) {
            var refreshToken = store.get('refreshToken');
            console.warn('Token expired, refreshing...');
            return $http({
                url: 'oauth/access_token',
                // This makes the request doesn't send the JWT
                skipAuthorization: true,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializer({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
            }).then(function (response) {
                _store(response.data, true);
                return response.data.access_token;
            }).catch(function (error) {
                console.error('refreshToken error status code', error.status);
                console.error('refreshToken error statusText', error.statusText);
                $rootScope.$broadcast(AUTH_EVENTS.refreshTokenFailed, error);
            });
        } else {
            return token;
        }
    }

    /**
     * Call this function to indicate that authentication was successfull and trigger a
     * retry of all deferred requests.
     * @param data an optional argument to pass on to $broadcast which may be useful for
     * example if you need to pass through details of the user that was logged in
     * @param configUpdater an optional transformation function that can modify the
     * requests that are retried after having logged in.  This can be used for example
     * to add an authentication token.  It must return the request.
     */
    function loginSuccess(data, configUpdater) {
        console.log("in loginSuccess configUpdater");
        var updater = configUpdater || function(config) {return config;};
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, data);
        HttpBuffer.retryAll(updater);
    }

    /**
     * Call this function to indicate that authentication should not proceed.
     * All deferred requests will be abandoned or rejected (if reason is provided).
     * @param data an optional argument to pass on to $broadcast.
     * @param reason if provided, the requests are rejected; abandoned otherwise.
     */
    function loginCancelled(data, reason) {
        HttpBuffer.rejectAll(reason);
        $rootScope.$broadcast(AUTH_EVENTS.loginCancelled, data);
    }

    function redirectWhenUnAuthenticated() {
        $rootScope.$on(AUTH_EVENTS.unAuthenticated, function () {
            console.log('unAuthenticated');
            LoginService.open();
            // logout().then( function () {
            //     $state.go('index').then( function () {
            //         LoginService.open();
            //     });
            // })
        });
    }

    function redirectWhenUnAuthorized() {
        $rootScope.$on(AUTH_EVENTS.unAuthorized, function () {
            console.log('unAuthorized');
            logout().then( function () {
                $state.go('accessdenied');
            })
        });
    }

    function redirectWhenSessionTimeout() {
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
            console.log('sessionTimeout');
            logout().then( function () {
                $state.go('index').then( function () {
                    LoginService.open();
                });
            })
        });
    }

}