var appServices = angular.module('appServices', []);


appServices.factory('VoteService', function($http) {
    return {
    	vote: function() {
            return $http.post(options.api.base_url + '/votes/vote');
        },
 
        getAll: function() {
            return $http.post(options.api.base_url + '/votes/all');
        }
    }
});



