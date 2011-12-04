
soundManager.url = '/javascripts/soundmanager/swf/'; // directory where SM2 .SWFs live

/*
 * Note that SoundManager will determine and append the appropriate .SWF file to the URL,
 * eg. /path/to/sm2-flash-files/soundmanager2.swf automatically.
 *
 * Bonus: Read up on HTML5 audio support, if you're feeling adventurous.
 * iPad/iPhone and devices without flash installed will always attempt to use it.
 *
 * Also, See the flashblock demo when you want to start getting fancy.
*/

// disable debug mode after development/testing..

// The basics: onready() callback
soundManager.debugMode = false;
soundManager.preferFlash = false;
soundManager.useHTML5Audio = true;

//soundManager.onready(function(){


var mySounds = new Array();
var myIDMap = new Array();
// used for unique ids (these will increment with each new instance, no matter how many are destructed)
mySoundCount = 0;

var Sound = function(id, url) {
  this.id = id;
  this.url = url;
  this.loops = 500;
  this.volume = 50;
  this.track;

  this.loadAndTrigger = function() {
    //var that = this;
    this.track = soundManager.createSound({
      id: this.id,
      url: this.url,
      loops: 500,
      onload: function() {
        this.play({loops:500}); // and start playing after callback
      },
    });

    this.track.load({volume:this.volume,loops:this.loops}); // load the sound ahead of time

  };

  this.setVolume = function(vol) {
    this.track.setVolume(vol);
  };

};

function soundInit(id, url) {
  var thisSound = new Sound(id, url);

  thisSound.loadAndTrigger();
  mySounds.push(thisSound);
  myIDMap.push('soundID'+mySoundCount);
  mySoundCount++;
  //nextID = mySoundCount.toString();
  return thisSound;
};

//Sound stop out here

function soundStopAll() {
  nSounds = mySounds.length;
  for(i=nSounds-1; i >= 0; i--) {
    mySounds[i].track.destruct();
    mySounds.splice(i, 1);
    myIDMap.splice(i, 1);
  }
};


function getPosition(arrayName, arrayItem)
{
  for(var i=0;i<arrayName.length;i++){
    if(arrayName[i]==arrayItem)
      return i;
  }
};

function soundStopByID(id)
{
  j = getPosition(myIDMap, id);
  mySounds[j].track.destruct();
  mySounds.splice(j,1);
  myIDMap.splice(j,1);
};

/*
function soundStop(id) {
  var nSounds = mySounds.length;
  for(i=0; i < nSounds; i++) {
    mySounds[i].track.destruct();
    mySounds.splice(i, 1);
    myIDMap.splice(i, 1);
  }
*/
