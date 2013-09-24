
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var db = require('./models/db');
var user = require('./routes/user');
var project = require('./routes/project');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//USER ROUTES
app.get('/user', user.index);
app.get('/user/new', user.create);
app.post('/user/new', user.doCreate);
// PROJECT ROUTES
app.get('/project/new', project.create);
app.post('/project/new', project.doCreate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
