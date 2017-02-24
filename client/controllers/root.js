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
              window.scrollTo(0, 0);
                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'rsvp-form',
                    controller: 'RsvpFormModalController',
                    // controllerAs: '$scope',
                    templateUrl: 'views/root/rsvp-form.html'
                });
            }

    }])
    .controller('RsvpFormModalController',
        ['$scope', '$rsvpService', '$uibModalInstance', '$mdDialog',
        function ($scope, $rsvpService, $uibModalInstance, $mdDialog) {

        $scope.error = false;
        $scope.success = false;

        $scope.dismiss = function () {
            $uibModalInstance.dismiss();
        };

        $scope.countries = [
            "Canada",
            "USA",
            "Australia"
        ];

        $scope.submitRsvp = function () {

          $scope.dismiss();

          $rsvpService.postRsvp($scope.primary)
            .then (function () {

              var parent = angular.element(document.querySelector('.main'));

              $mdDialog.show(
                {
                  parent: parent,
                  clickOutsideToClose: true,
                  escapeToClose: true,
                  template: '<md-dialog md-theme="default" ng-class="dialog.css" class="_md md-default-theme md-transition-in" role="alertdialog" tabindex="-1">' +
                  '<md-dialog-content class="md-dialog-content" role="document" tabindex="-1">' +
                  '<h2 class="primary-purple md-title headline-alt-21px">Russell thanks you!</h2>' +
                  '<div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">' +
                  '<p class="ng-binding">See you there!</p>' +
                  '</div></md-dialog-content>' +
                  '</md-dialog>'
                })

            })
            .catch (function () {

              $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('.main')))
                  .clickOutsideToClose(true)
                  .title('Russell is sorry!')
                  .textContent('Something went wrong!')
                  .ok('Try again!')
              );
            })
              .finally(function() {

                // $scope.dismiss();
              });
        };

    }]);