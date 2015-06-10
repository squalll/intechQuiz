var appServices = angular.module('appServices', []);


appServices.factory('QuestionService', function($http) {
    return {
    	pushNext: function() {
            return $http.get( '/questions/pushNext');
        },
 
        reset: function() {
            return $http.get( '/questions/reset');
        },
		 getNext: function() {
            return $http.get( '/questions/getNext');
        },
		goToQuest: function(n) {
            return $http.post( '/questions/goToQuest',{goTo: n});
        }

    }
});

appServices.factory('VoteService', function($http) {
    return {
    	vote: function(v) {
            return $http.post( '/votes/vote', {vote: v});
        },
 
        getAll: function() {
            return $http.get( '/votes/getAll');
        },
		 reset: function() {
            return $http.get( '/votes/reset');
        }
		
    }
});



