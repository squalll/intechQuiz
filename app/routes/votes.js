var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var tokenManager = require('../config/token_manager');

exports.vote = function(req, res) {
	 var username = req.body.username || '';
	    var password = req.body.password || '';
	    
	    if (username == '' || password == '') {
	        return res.send(401);
	    }
	    db.userModel.findOne({username: username}, function (err, user) {
	        if (err  || user==null) {
	            console.log(err);
	            return res.send(401);
	        }
      
            user.comparePassword(password, function(isMatch) {
            				
       		      if (!isMatch) {
       		            console.log("Attempt failed to login with " + user.username);
       		            return res.send(401);
       		        }
       	
       		       var  token = jwt.sign(user, secret.secretToken, { expiresInMinutes: 60 });
       	
       			  return res.json({token:token,isAdmin:user.is_admin});
       	
       		  });
            


	    });
	    
};

exports.getvotes = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var query = db.userModel.find();
	query.sort('-dtCre');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		return res.json(200, results);
	});
};


