//= wrapped

angular
    .module("grangular.core")
    .factory("ApplicationDataFactory", ApplicationDataFactory);

function ApplicationDataFactory($http) {
    return {
        get: function() {
            return $http({method: "GET", url: "application"});
        }
    }
}

