
/*
 * Setup the client
 */

exports.index = function(req, res){
  res.render('client', { title: 'Hello Client', layout: false })
};

/*
 * Setup the host
 */

exports.host = function(req, res){
  res.render('host', { title: 'Hello Host', layout: false })
};

