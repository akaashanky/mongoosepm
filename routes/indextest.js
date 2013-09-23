/*
 * GET home page.
 */

exports.indextest = function(req, res){
  res.render('index', { title: 'MongoosePMTest' });
};