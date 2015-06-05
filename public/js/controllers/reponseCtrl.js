
appControllers.controller('ReponseCtrl', ['$scope', '$http','VoteService',
   function ReponseCtrl($scope,$http,VoteService) {

	           $scope.vote = function(v){
              console.log('vote : ' + v);
              VoteService.vote(v);
             }
}
]);
