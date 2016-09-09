angular.module('iris-and-russell')
    .controller('RootController', ['$scope', '$rsvpService', function ($scope, $rsvpService) {

        $scope.photos = [
                'src/img/slide1.jpg',
                'src/img/slide2.jpg',
                'src/img/slide5.jpg',
                'src/img/slide6.jpg',
                'src/img/slide8.jpg',
                'src/img/slide9.jpg',
                'src/img/slide10.jpg',
                'src/img/slide11.jpg',
                'src/img/slide12.jpg'
        ];
    }]
);