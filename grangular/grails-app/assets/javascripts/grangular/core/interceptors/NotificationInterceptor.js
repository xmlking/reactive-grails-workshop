//= wrapped

//TODO Grails flash messages
angular
    .module("grangular.core")
    .factory("NotificationInterceptor", NotificationInterceptor);

function NotificationInterceptor ($q, AlertService) {
    var service = {
        response: response
    };

    return service;

    function response (response) {
        var alertKey = response.headers('X-alert');
        if (angular.isString(alertKey)) {
            AlertService.success(alertKey, { param : response.headers('X-params')});
        }
        return response;
    }
}