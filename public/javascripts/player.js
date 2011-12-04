function Player (id, className, x, y, hide_div) {
  var that = this,

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
    //this.cube = cubes.push(createCube(id, 200, 200));
    //animate();
    console.log(mySoundCount);
    this.sound = soundInit('soundID' + mySoundCount, tracks[(mySoundCount % tracks.length)]);
  }
}

Player.prototype = {
  vx: 0,
  vy: 0,
  cube: {},
  server: false,
  sound: {},

  move: function () {
    var that = this, x, y;

    that.vx *= friction;
    that.vy *= friction;
    x = that.x + that.vx;
    y = that.y + that.vy;

    if (x > stageW - diameter) {
      x = stageW - diameter;
      that.vx *= bounce;
    } else if (x < 0) {
      x = 0;
      that.vx *= bounce;
    }

    if (y > stageH - diameter) {
      y = stageH - diameter;
      that.vy *= bounce;
    } else if (y < 0) {
      y = 0;
      that.vy *= bounce;
    }

    that.vx += ax;
      that.vy += ay;

    that.update(x, y);
  },

  update: function (x, y) {
    var that = this;
    that.x = x;
    that.y = y;
    //that.ball.style.webkitTransform = 'translate3d(' + that.x + 'px,'+ that.y +'px,0)';

   //console.dir(this.sound);

    var new_vol = (y / 660) * 100;

    if(that.server && typeof(that.sound.track) != "undefined") {
      //console.log(new_vol);
      that.sound.setVolume(new_vol);
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
