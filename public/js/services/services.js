var appServices = angular.module('appServices', []);


appServices.factory('VoteService', function($http) {
    return {
    	vote: function(v) {
            return $http.post(options.api.base_url + '/votes/vote', {vote: v});
        },
 
        getAll: function() {
            return $http.post(options.api.base_url + '/votes/all');
        }
    }
});



