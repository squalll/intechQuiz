
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
        var categories = [];
        for (var i = 1 ; i < data.answers.length+1 ; i++){
            categories.push('' + i);
        }
        Highcharts.charts[0].xAxis[0].setCategories(categories);
    });

   socket.on('votes', function (votes) {
       //on reduit le tableau au nombre de reponses possibles pour se caler sur les categories
       votes = votes.slice(0, $scope.currentQuestion.answers.length);
       console.log(votes);
       Highcharts.charts[0].series[0].setData(votes);
   });


    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'/*,
                events: {
                    click: function(e) {
                        alert ('Category: '+ e.xAxis[0].value +', value: '+ e.yAxis[0].value);
                    }
                }*/
            },

            plotOptions: {
                bar: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            console.log('click on : ' + this.data[e.point.category].y);
                        }
                    }
                }
            }

        },
        series: [{
            data: []
        }],
        title: {
            text: 'Réponses'
        },

        loading: false


    }



}
]);
