
appControllers.controller('ReponseCtrl', ['$scope', '$http','VoteService',
   function ReponseCtrl($scope,$http,VoteService) {
    
    $scope.voted = false;
    $scope.currentQuestion={};
   //appel http au clic pour envoyer le vote au serveur
   $scope.vote = function(v){
      console.log('vote : ' + v);
      VoteService.vote(v).success(function(response) {
          //check winner
          if (response.win != null) {
              if (response.win == true) {
                  $('md-whiteframe').css('background-color', 'green')
                  console.log("winner");
              } else {
                  $('md-whiteframe').css('background-color', 'red')
              }
          }
      });
      
      //image 'vote ok' en attendant la next question
      $scope.voted = true;

   }
   
   //websocket pour recuperer la nouvelle question
   var socket = io();

    socket.on('question', function (data) {
		 $scope.voted = false;

        $('md-whiteframe').css('background-color', '')

        //on ne passe pas tout sinon la reponse arrive sur le client
         $scope.currentQuestion = {
             question: data.question,
             answers: data.answers
         };
		 $scope.$apply();
    });
	
	    socket.on('clean', function (data) {
		  $scope.currentQuestion={};

        $('md-whiteframe').css('background-color', '')
		$scope.currentQuestion = {
             question: data.question
			 };
   
		 $scope.$apply();
    });



    //si on veut gerer le vote par websocket
    /*$('.btn-group button').each(function(index, button){
        $(button).on('click', function(){
            socket.emit('vote', $(button).text());
        });
    });*/

 
    
}
]);
