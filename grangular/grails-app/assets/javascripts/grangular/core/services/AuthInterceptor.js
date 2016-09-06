//= wrapped

angular
    .module("grangular.core")
    .factory('AuthInterceptor', AuthInterceptor);


function AuthInterceptor ($q, store) {

    return {

        // Intercept 401s and redirect you to login
        responseError: function(response) {

            if(response.status === 401) {
                // remove any stale tokens
                store.remove('profile');
                store.remove('token');
                store.remove('refreshToken');
                return $q.reject(response)
            }
            else {
                return $q.reject(response)
            }
        }
    }
}