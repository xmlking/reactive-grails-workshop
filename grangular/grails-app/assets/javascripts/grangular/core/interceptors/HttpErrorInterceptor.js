//= wrapped

angular
    .module("grangular.core")
    .factory("HttpErrorInterceptor", HttpErrorInterceptor);

function HttpErrorInterceptor ($rootScope, $q, $injector, $localStorage, $sessionStorage) {

    var service = {
        responseError: responseError
    };

    return service;

    function responseError (response) {
        if (!(response.status === 401 && (response.data === '' || (response.data.path && response.data.path.indexOf('/api/account') === 0 )))) {
            $rootScope.$emit('httpError', response);
        }
        return $q.reject(response);
    }

}