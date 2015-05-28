// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 3580; 				// set the port
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var secret = require('./app/config/secret');
var tokenManager = require('./app/config/token_manager');

var methodOverride = require('method-override');
// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



// routes ======================================================================

var routes = {};
routes.votes = require('./app/routes/votes.js');
routes.questions = require('./app/routes/questions.js');

//Login
app.get('/votes/vote', routes.votes.vote); 

//Get all votes
app.get('/votes/getAll', routes.votes.getvotes); 

//Get reset
app.get('/votes/reset', routes.votes.reset);

//getNext
app.get('/questions/getNext', routes.questions.getNext);

// listen (start app with node server.js) ======================================
var http = app.listen(port);
console.log("App listening on port " + port);

// web socket ======================================================================
var io = require('socket.io')(http);

var questions = [
    'question 1'
    , 'question 2'
    , 'question 3'
    , 'question 4'
    , 'question 5'
    , 'question 6'
    , 'question 7'
];

var questionNumber = 0;

io.on('connection', function(socket){

    console.log('a user connected : ' + socket.handshake.address);
    socket.emit('question', questions[questionNumber]);

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    socket.on('vote', function(msg){
        console.log('user vote is : ' + msg);
        socket.emit('question', questions[questionNumber++]);
    });
    
    socket.on('next', function(msg){
        console.log('next question is : ' + questions[questionNumber+1]);
        io.sockets.emit('question', questions[questionNumber++]);
    });
});

