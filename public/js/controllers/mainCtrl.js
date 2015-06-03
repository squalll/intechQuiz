appControllers.controller('MainController', ['$rootScope','$scope', '$http',
function MainController($rootScope,$scope, $http) {



  var socket = io();

    socket.on('question', function (data) {
        console.log('get new question : ' + data);
        $('#question').text(data);
    });


    $('.btn-group button').each(function(index, button){
        $(button).on('click', function(){
            socket.emit('vote', $(button).text());
        });
    });
    
}]);