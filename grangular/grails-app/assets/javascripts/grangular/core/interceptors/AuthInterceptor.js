//= wrapped

angular
    .module("grangular.core")
    .factory("AuthInterceptor", AuthInterceptor);

function AuthInterceptor($rootScope, AUTH_EVENTS, $q, HttpBuffer) {

    var service = {
        responseError: responseError
    };

    return service;

    function responseError(rejection) {

        if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
            var deferred = $q.defer();
            HttpBuffer.append(rejection.config, deferred);
            // we will use jwtInterceptor for this.
            //$rootScope.$broadcast(AUTH_EVENTS.unAuthenticated, rejection);
            return deferred.promise;
        }
        if (rejection.status === 419 || rejection.status === 440) {
            $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection);
        }
        if (rejection.status === 403 && !rejection.config.ignoreAuthModule) {
            var deferred2 = $q.defer();
            HttpBuffer.append(rejection.config, deferred2);
            $rootScope.$broadcast(AUTH_EVENTS.unAuthorized, rejection);
            return deferred2.promise;
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
    }
}