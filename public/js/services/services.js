var appServices = angular.module('appServices', []);


appServices.factory('QuestionService', function($http) {
    return {
    	pushNext: function() {
            return $http.get(options.api.base_url + '/questions/pushNext');
        },
 
        reset: function() {
            return $http.get(options.api.base_url + '/questions/reset');
        }
    }
});

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



