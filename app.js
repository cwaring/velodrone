
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , isHost
	, players = {}
  , host_connected
  , clients = 0;

var app = module.exports = express.createServer(),
    socket = io.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  socket.enable('browser client etag');

  socket.set('transports', [
         'websocket'
         , 'flashsocket'
         , 'htmlfile'
         , 'xhr-polling'
         , 'jsonp-polling'
  ]);
});

app.configure('production', function(){
  app.use(express.errorHandler());
  socket.enable('browser client etag');
  socket.set('log level', 1);

  socket.set('transports', [
         'websocket'
         , 'flashsocket'
         , 'htmlfile'
         , 'xhr-polling'
         , 'jsonp-polling'
  ]);
});

// Routes

app.get('/', routes.index);
app.get('/host', routes.host);

socket.sockets.on('connection', function (client) {

  client.on('message', function (message) {

    switch(message.type) {
      case 'connect_client':

        if(clients > 16) return;

        if(!host_connected) {
          delete players[client.id];

          // Broadcast the logged out user's id
          client.json.broadcast.send({ type: 'leave', id: client.id });
          clients = 0;
        }

        isHost = false;
        client.json.send({ type: 'playerslist', list: players });

        // Add the new user to the list of players
        players[client.id] = { x:0, y:0 }

        // Broadcast the new user to all players
        client.json.broadcast.send({type: 'new', id: client.id});
        clients++;
        break;

        case 'connect_host':

        isHost = true;
        host_connected = true;
        client.json.send({ type: 'playerslist', list: players });

        break;

        case 'position':
        // Broadcast the new user position
        players[message.id] = { x: message.x, y: message.y };
        client.json.broadcast.send({ type: 'position', list: players });

        break;
    }

  });

  client.on('disconnect', function () {
    // Remove the user from the list of players
    delete players[this.id];
    // Broadcast the logged out user's id
    client.json.broadcast.send({ type: 'leave', id: this.id });
    if(clients >= 2) clients = clients - 2;
  });

});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
