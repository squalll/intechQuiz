
appControllers.controller('AdminCtrl', ['$scope', '$http','QuestionService',
   function AdminCtrl($scope,$http,QuestionService) {

	          $scope.next = function(){     
              QuestionService.pushNext();
             }
}
]);
