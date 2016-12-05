angular.module('iris-and-russell').factory('$rsvpService', ['$http', function ($http) {

    var service = {
        getRsvps: function() {

            return $http({
                method: 'GET',
                url: '/api/rsvps'
            })
        },
        getRsvpById: function() {

        },
        postRsvp : function (attendee) {

            return $http({
                method: 'POST',
                url: '/api/rsvp',
                data: attendee
            })
        }
    };

    return service;
}]);