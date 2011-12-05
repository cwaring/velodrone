function Player (id, className, x, y, host) {
  this.cube = {};
  this.host = host;
  this.id = id;

  x = x || 0;
  y = y || 0;
  this.update(x, y);

  if(this.host) {
    this.cube = new Cube(id, 200, 200);
    this.cube.createCube();
    this.cube.animate();
    this.sound = soundInit('soundID' + mySoundCount, tracks[mySoundCount % tracks.length]);
  }
}

Player.prototype = {
  vx: 0,
  vy: 0,
  cube: {},
  bar: {},
  host: false,
  sound: {},

  move: function () {
    var that = this, x, y;

    that.update(ax, ay);
  },

  update: function (x, y) {
    var that = this;
    that.x = x;
    that.y = y;

    var new_vol = (y / 11) * 100;
    if(new_vol < 0) {
      new_vol = 0;
    }
    var new_pan = (x / 30) * 200;
    new_pan = new_pan > 100 ? 100 : new_pan;
    new_pan = new_pan < -100 ? -100 : new_pan;
    new_pan = parseInt(new_pan);
    new_vol = parseInt(new_vol);

    if(that.host && typeof(that.sound.track) != "undefined") {
      //console.log(new_vol);
      that.sound.setVolume(new_vol);
      that.sound.setPan(new_pan);
      this.cube.changeSize(new_vol / 100 * 2);
    }
  },

  remove: function () {
    if(this.host) {
      this.sound.track.destruct();
      this.cube.destroy();
    } else {
      stage.removeChild(this.ball);
    }
  }
}
