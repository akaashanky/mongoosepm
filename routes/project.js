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
     			res.send('This is where the projects by User Id page will go.... I think.');
     		}

		});
	} else{
		res.redirect('/login');
	}

};