var mongoose = require('mongoose');
var Project = mongoose.model('Project');

exports.create = function (req, res) {
	if(req.session.loggedIn===true){
		res.render('project-form',{title: 'New Project...',
									buttonText: 'Create Project'});
	} else{
		res.redirect('/login');
	}

};

exports.doCreate = function(req, res){
	if(req.session.loggedIn===true){
		Project.create({
			projectName: req.body.ProjectName,
			modifiedOn: Date.now(),
			createdBy: req.session.user._id,
		}, function(err, project){
			if(err){
       			console.log(err);
       			if(err.code===11000){
         			res.redirect( '/user/new?exists=true' );
       			}else{
         			res.redirect('/?error=true');
       			}
     		}else{
     			//Success
     			console.log("Project created and saved! "+project);
     			res.redirect('/user');
     		}

		});
	} else{
		res.redirect('/login');
	}

};

exports.byUser = function(req, res){
	if(req.params.userid){
		Project.findByUserID(req.params.userid, function(err, projects){
			if(!err){
				res.json(projects);
			}else{
				res.json({
					status: "error",
					error: "Error finding projects"
				});
			}
		});

	}else{
		res.json({
					status: "error",
					error: "Either not logged in, or not logged in as the right user."
				});
	}
};

exports.index = function(req, res){

}