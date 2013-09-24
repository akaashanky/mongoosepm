var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.create = function(req, res){
	res.render('user-form',{title: 'Sign Up', 
							buttonText: 'Join!'});
};

 // POST new user creation form
   exports.doCreate = function(req, res){
     User.create({
       name: req.body.FullName,
       email: req.body.Email,
       modifiedOn : Date.now(),
       lastLogin : Date.now()
     }, function( err, user ){
       		if(err){
       			console.log(err);
       			if(err.code===11000){
         			res.redirect( '/user/new?exists=true' );
       			}else{
         			res.redirect('/?error=true');
       			}
     		}else{
       		// Success
       		console.log("User created and saved: " + user);
       		req.session.user = { "name" : user.name, "email": user.email, "_id":
   								user._id };
   			req.session.loggedIn = true;
   			res.redirect( '/user' );
			}
		}); 
 	};

exports.index = function(req, res){
 	if(req.session.loggedIn===true){
 		res.render('user-page', {
         title: req.session.user.name,
         name: req.session.user.name,
         email: req.session.user.email,
         userID: req.session.user._id
		});
 	}
 	else{
 		res.redirect('/login');
 	}
};