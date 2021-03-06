var socket
  , sessionid = 0
  , players
  , connectTimeout
  , ready;

ready = false;

if (window.DeviceOrientationEvent) {
  //console.log("DeviceOrientation is supported");
} else {
  //console.log("");
}

function socketInit() {

  socket = new io.connect('/', { port: 80, reconnect: false });

  socket.on('connect', function () {
    socket.emit('message', { type: 'connect_client' });
    sessionid = socket.socket.sessionid;
    me = new Player(sessionid, 'player');
    ready = true;
    mainLoop = setInterval(moveMe, 10);
    $(document).ready(function() {
      $("div#popup").show();
    });
  });

  socket.on('disconnect', function () {
    document.getElementById('popup').style.display = 'block';
    socket.disconnect();
    process.exit();
  });
}

function sendPosition () {
  if (ready) {
    var pos = buffer.length ? buffer[0] : { x:me.x, y:me.y };
    buffer.shift();
    socket.emit('message', { type:'position', id:me.id, x:pos.x, y:pos.y });
  }
}

socketInit();
