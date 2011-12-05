var socket
  , sessionid = 0
  , players
  , connectTimeout
  , counter
  , cubes = []
  , players = []
  , player_ids = []
  , interval = false;

counter = 0;

function socketInit() {
  socket = new io.connect('/', { port: 80, transports: ['websocket'] });

  socket.on('connect', function () {
    socket.emit('message', { type: 'connect_host' });
    sessionid = socket.socket.sessionid;
  });

  socket.on('message', function (message) {
    switch (message.type) {
      case 'position':
        // Update players position
        updatePosition(message.list);
        ready = true;
        break;
      case 'playerslist':
        // Create all opponents
        createOpponents(message.list);
        ready = true; // ready to communicate with socket server
        break;
      case 'new':
        // New player joined
        if(message.id > 0 && !player_ids[message.id]) {
          player_ids[message.id] = true;
          players.push(new Player(message.id, 'opponent', 0, 0, true));
        }
        break;
      case 'leave':
        // Player disconnected
        leave(message.id);
        break;
    }
  });

  socket.on('disconnect', function () {
    document.getElementById('popup').style.display = 'block';
  });
}

function updatePosition (data) {
  var id, i, l;

  for (i=0, l=players.length; i<l; i++) {
    id = players[i].id;
    if (id in data) {
      players[i].update(data[id].x, data[id].y);
    }
  }
}

function createOpponents (list) {
  for (var i in list) {
    players.push(new Player(i, 'opponent', list[i].x, list[i].y, true));
  }
}

function leave (id) {
  for (var i=0, l=players.length; i<l; i++) {
    if (id == players[i].id) {
      players[i].remove();
      players.splice(i, 1);
      return;
    }
  }
}

socketInit();
