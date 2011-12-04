function Player (id, className, x, y, hide_div) {
  that = this;
  this.cube = {};

  div = document.createElement('div');

  div.id = 'b' + id;
  div.className = 'ball ' + className;
  this.server = hide_div || false;

  if(!this.server) {
    stage.appendChild(div);
  }

  that.id = id;
  that.ball = div;

  x = x || 0;
  y = y || 0;
  that.update(x, y);

  if(this.server) {
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
  server: false,
  sound: {},

  move: function () {
    var that = this, x, y;

    //console.log(ay);

    that.update(0, ay);
  },

  update: function (x, y) {
    var that = this;
    that.x = x;
    that.y = y;
    //that.ball.style.webkitTransform = 'translate3d(' + that.x + 'px,'+ that.y +'px,0)';

   //console.dir(this.sound);

    var new_vol = (y / 11) * 100;
    if(new_vol < 0) {
      new_vol = 0;
    }
    var new_pan = (x / 11) * 100;

    if(that.server && typeof(that.sound.track) != "undefined") {
      //console.log(new_vol);
      that.sound.setVolume(new_vol);
      //that.sound.setPan(new_pan);
      //this.cube.changeSize(new_vol / 100 * 2);
      that.bar.changeSize(new_vol);
    }
  },

  remove: function () {
    if(this.server) {
      //console.dir(this.sound);
      this.sound.track.destruct();
      //that.cube.remove();
    } else {
      stage.removeChild(this.ball);
    }
  }
}
