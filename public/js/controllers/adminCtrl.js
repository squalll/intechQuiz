
appControllers.controller('AdminCtrl', ['$scope', '$http','QuestionService','VoteService',
   function AdminCtrl($scope,$http,QuestionService,VoteService) {

    $scope.currentQuestion={};
	
	 $scope.goToQuestion="";
    $scope.showRep=false;
	
	 $scope.next = function(){
        QuestionService.getNext();
            $scope.showRep=false;
      }
	  
	   $scope.goTo = function(){
        QuestionService.goToQuest($scope.goToQuestion);
        $scope.showRep=false;
      }
	  
	  $scope.push = function(){
	  	VoteService.reset().success(function(retour) {
                   QuestionService.pushNext();
                       $scope.showRep=true;
        }).error(function(status,retour) {
            //console.log(status);
            // console.log(data);
        });;
      }

	 
        VoteService.getAll()

	  $scope.reset = function(){
        QuestionService.reset();
		VoteService.reset();
      }
	     var socket = io();

    socket.on('questionAdmin', function (data) {
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
