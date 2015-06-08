
appControllers.controller('AdminCtrl', ['$scope', '$http','QuestionService',
   function AdminCtrl($scope,$http,QuestionService) {

    $scope.currentQuestion={};
	
	 $scope.next = function(){     
        QuestionService.pushNext();
      }
	  
	  $scope.reset = function(){     
        QuestionService.reset();
      }
	     var socket = io();

    socket.on('question', function (data) {
        $scope.currentQuestion=data;
    });
}
]);
