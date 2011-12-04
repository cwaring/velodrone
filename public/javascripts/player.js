function Player (id, className, x, y, hide_div) {
  var that = this,
    div = document.createElement('div');

  div.id = 'b' + id;
  div.className = 'ball ' + className;
  hide_div = hide_div || false;

  if(!hide_div) {
    stage.appendChild(div);
  }

  that.id = id;
  that.ball = div;

  x = x || 0;
  y = y || 0;
  that.update(x, y);

  if(hide_div) {
    //this.cube = cubes.push(createCube(id, 200, 200));
  }

}

Player.prototype = {
  vx: 0,
  vy: 0,
  cube: {},

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
    that.ball.style.webkitTransform = 'translate3d(' + that.x + 'px,'+ that.y +'px,0)';
  },

  remove: function () {
    stage.removeChild(this.ball);
  }
}
