
appControllers.controller('AdminCtrl', ['$scope', '$http','QuestionService','VoteService',
   function AdminCtrl($scope,$http,QuestionService,VoteService) {

    $scope.currentQuestion={};
	
	 $scope.next = function(){     
        QuestionService.pushNext();
		VoteService.reset();
      }
	  
	   $scope.getReponse = function(){     
		VoteService.getAll().success(function(retour) {
			$scope.chartConfig.series[0].data = [10, 15, 1, 4, 6];
			 console.log('data : ' + retour);
			
			// $location.path("/config");
			
		
		}).error(function(status,retour) {
			//console.log(status);
			// console.log(data);
		});;
		
      }
	  
	  
	      $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }
	
	  $scope.reset = function(){     
        QuestionService.reset();
		VoteService.reset();
      }
	     var socket = io();

    socket.on('question', function (data) {
        $scope.currentQuestion=data;
    });
	
	
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Réponses'
        },

        loading: false
    }
}
]);
