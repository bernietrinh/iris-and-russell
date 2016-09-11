angular.module('iris-and-russell')
    .controller('RootController', ['$scope', '$uibModal', function ($scope, $uibModal) {

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

        $scope.showRsvpForm = showForm;

            function showForm() {
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'rsvp-form',
                    controller: 'RsvpFormModalController',
                    // controllerAs: '$scope',
                    templateUrl: 'views/root/rsvp-form.html'
                });
            }

    }])
    .controller('RsvpFormModalController', ['$scope', '$rsvpService', '$uibModalInstance', function ($scope, $rsvpService, $uibModalInstance) {

        $scope.dismiss = function () {
            $uibModalInstance.dismiss();
        }


    }]);