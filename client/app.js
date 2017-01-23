angular.module('iris-and-russell', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute', 'ui.bootstrap', 'duScroll'])

    .config(['$routeProvider',
        '$locationProvider',
        '$mdThemingProvider',
        function ($routeProvider,
                  $locationProvider,
                  $mdThemingProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/root/index.html',
                controller: 'RootController'
            })
            .when('/admin', {
                templateUrl: 'views/admin/index.html',
                controller: 'AdminController'
            });

        $locationProvider.html5Mode(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('deep-purple');

    }])
    .value('duScrollDuration', 600);
