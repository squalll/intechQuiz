// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 3580; 				// set the port
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var secret = require('./app/config/secret');
//var tokenManager = require('./app/config/token_manager');

var methodOverride = require('method-override');
// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



// routes ======================================================================


// listen (start app with node server.js) ======================================
var http = app.listen(port);
console.log("App listening on port " + port);

// web socket ======================================================================
var io = require('socket.io')(http);





io.on('connection', function(socket){

    console.log('a user connected : ' + socket.handshake.address);
    //console.log(socket.client);
    
    //envoi de la question courante des qu'on se connecte, si on n'a pas deja vote
    if(routes.questions.currentQuestion()
    //&& !routes.votes.hasVoted(socket)
        ){
        socket.emit('question', routes.questions.currentQuestion());
        console.log('send current question to : ' + socket.handshake.address);
    }else{
        //console.log('no question or already voted : ' + socket.handshake.address);
    }

    socket.on('disconnect', function(){
        console.log('user disconnected : ' + socket.handshake.address);
    });
    
    //si on veut faire le vote en websocket...
    /*socket.on('vote', function(msg){
        console.log('user vote is : ' + msg);
        socket.emit('question', questions[questionNumber++]);
    });*/

    //getion du bouton 'next question'    
    socket.on('next', function(msg){
        console.log('next question is : ' + questions[questionNumber+1]);
        //io.sockets.emit('question', questions[++questionNumber]);
    });
});

var routes = {};
routes.votes = require('./app/routes/votes.js');
routes.questions = require('./app/routes/questions.js');

//Login
app.post('/votes/vote', routes.votes.vote(io), routes.questions.checkWinner);

//Get all votes
app.get('/votes/getAll', routes.votes.getvotes); 

//Get reset
app.get('/votes/reset', routes.votes.reset);

//getNext
app.get('/questions/getNext', routes.questions.getNext);

//pushNext
app.get('/questions/pushNext', routes.questions.pushNext(io));

//reset questions
app.get('/questions/reset', routes.questions.reset);




