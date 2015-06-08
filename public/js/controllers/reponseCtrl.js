
appControllers.controller('ReponseCtrl', ['$scope', '$http','VoteService',
   function ReponseCtrl($scope,$http,VoteService) {
    
    $scope.voted = false;
    
   //appel http au clic pour envoyer le vote au serveur
   $scope.vote = function(v){
      console.log('vote : ' + v);
      VoteService.vote(v);
      
      //image 'vote ok' en attendant la next question
      $scope.voted = true;
   }
   
   //websocket pour recuperer la nouvelle question
   var socket = io();

    socket.on('question', function (data) {
        console.log('got new question : ' + data);
        $('#question').text(data);
    });


    //si on veut gerer le vote par websocket
    /*$('.btn-group button').each(function(index, button){
        $(button).on('click', function(){
            socket.emit('vote', $(button).text());
        });
    });*/

 
    
}
]);
