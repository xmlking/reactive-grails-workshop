//= wrapped

angular
    .module("grangular.core")
    .service("UserService", UserService);

function UserService($http, $httpParamSerializer, store, jwtHelper) {

    function _store(oToken) {
        var profile = {};
        profile.username = oToken.username;
        profile.roles = oToken.roles;
        store.set('token', oToken.access_token);
        store.set('refreshToken', oToken.refresh_token);
        store.set('profile', profile);
    };


    this.isLoggedIn = function () {
        return (store.get('profile') && store.get('profile') !== undefined)
    };

    this.getProfile = function () {
        return store.get('profile');
    };

    this.login = function(user) {
        return $http({
            url: 'http://localhost:9080/api/login',
            method: 'POST',
            data: user
        }).then(function(response) {
            _store(response.data);
        }).catch(function(error) {
            console.error('login error status code',error.status);
            console.error('login error statusText',error.statusText);
        });

    };



    // refresh token if needed.
    this.getToken = function() {
        //return store.get('token');

        var token = store.get('token');
        if (token && jwtHelper.isTokenExpired(token)) {
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
                    refresh_token: store.get('refreshToken')
                })
            }).then(function (response) {
                _store(response.data);
                return response.data.access_token;
            }).catch(function (error) {
                console.error('refresh error status code', error.status);
                console.error('refresh error statusText', error.statusText);
            });
        } else {
            return token;
        }
    };

    this.logout = function() {
        return new Promise( function (resolve, reject) {
            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
            resolve(true);
        });
    };

    // when using custom JWT backend
    this.logoutNext = function() {
        return $http({
            url: 'http://localhost:9080/api/logout',
            // This makes it so that this request doesn't send the JWT
            skipAuthorization: true,
            method: 'POST'
        }).then(function(response) {
            store.remove('profile');
            store.remove('token');
            store.remove('refreshToken');
        }).catch(function(error) {
            console.error('logout error status code',error.status);
            console.error('logout error statusText',error.statusText);
        });
    };


}