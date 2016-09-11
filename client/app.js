angular.module('iris-and-russell', ['ngAria', 'ngAnimate', 'ngMessages', 'ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/root/index.html',
                controller: 'RootController'
            })
            .when('/admin', {
                templateUrl: 'views/admin/index.html',
                controller: 'AdminController'
            });

        $locationProvider.html5Mode(true);

    }]);