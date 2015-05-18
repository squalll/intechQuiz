var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var tokenManager = require('../config/token_manager');

exports.getNext = function(req, res) {

	return res.json(200, {questions:{question:"test question 1",reponse:-1}});
 

};
