
// Lock screen
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var stage, stageW, stageH,
	friction = 0.98,
	bounce = -0.75,
	sensitivity = 0.2,
	diameter = 40,
	ax = ay = 0,
	mainLoop,
	players = [], me,
	count = 0,
	floodControl, ready,
	buffer = [];

// Main Game Loop
function moveMe () {
	me.move();

	buffer[buffer.length] = { x: me.x, y: me.y };

	if (buffer.length > 10) buffer.shift();

	sendPosition();
}

window.addEventListener('deviceorientation', function (e) {
	ax = e.gamma * sensitivity;
	ay = e.beta * sensitivity;
}, false);

window.addEventListener('load', function () {
	stage = document.getElementById('stage');
	stageW = stage.clientWidth;
	stageH = stage.clientHeight;

	var popup = document.getElementById('popup');

	/*if (!navigator.appVersion.match(/ipad/gi)) {
		popup.innerHTML = 'Sorry, this app is for iPad only';
		popup.style.display = 'block';
		return;
	}

	if (!('ondevicemotion' in window)) {
		popup.innerHTML = 'Sorry, you need iPad ≥ 4.2 to run this app';
		document.getElementById('popup').style.display = 'block';
		return;
	}*/

	socketInit();
}, false);
