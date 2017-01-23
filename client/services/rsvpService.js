angular.module('iris-and-russell').factory('$rsvpService', ['$http', '$q', function ($http, $q) {

    var service = {
        getRsvps: function() {

            var deferral = $q.defer();

            $http({
                method: 'GET',
                url: '/api/rsvps'
            })
              .then(function (response) {

                deferral.resolve(response.data);
              })
              .catch(function (err) {
                deferral.reject(err);
              });

            return deferral.promise;
        },
        postRsvp : function (attendee) {

          console.log(attendee);
            return $http({
                method: 'POST',
                url: '/api/rsvp',
                data: attendee
            })
        },
      deleteRsvp: function (id) {

          var deferral = $q.defer();

          $http.delete(
            '/api/rsvps/remove/' + id
          )
            .then(function (response) {

              deferral.resolve(response.data);
            })
            .catch(function (err) {
              deferral.reject(err);
            });

          return deferral.promise;
      }
    };

    return service;
}]);