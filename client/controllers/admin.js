angular.module('iris-and-russell')
    .controller('AdminController', ['$scope', '$rsvpService', function ($scope, $rsvpService) {

      $scope.rsvps = {};

      $rsvpService.getRsvps()
        .then(function (rsvps) {

          $scope.rsvps = rsvps;
        });

      $scope.deleteAttendee = function (id) {

        $rsvpService.deleteRsvp(id)
          .then(function (rsvps) {
            $scope.rsvps = rsvps;
          })
      };

    }]);