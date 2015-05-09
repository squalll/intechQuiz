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
var sys = require('sys')
var exec = require('child_process').exec;

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

//Login
app.post('/votes/vote', routes.votes.vote); 

//Get all votes
app.get('/votes/getAll', routes.votes.getvotes); 



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
