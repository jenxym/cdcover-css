const vinyl = document.querySelector('.vinilo');
const buttonPlay = document.querySelector('.play');
const buttonPause = document.querySelector('.pause');
const musicBg = document.querySelector('#music-bg');
const vinylAnimation = vinyl.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
	duration: 2000,
	iterations: Infinity,
});
vinylAnimation.pause();
const brazo = document.querySelector('.brazo');
let intervalMusicPlaying = null;

vinyl.addEventListener('click', () => {
	vinyl.style.transition = 'all 2s';
	if (vinyl.style.left === '183px') {
		vinyl.style.left = -200 + 'px';
		buttonPlay.disabled = true;
		buttonPause.disabled = true;
		musicBg.pause();
		stopVinyl();
		stopBrazo();
		return;
	}
	vinyl.style.left = 183 + 'px';
	setTimeout(() => {
		buttonPlay.disabled = false;
		buttonPause.disabled = false;
		spinVinyl();
	}, 2000);
});

buttonPlay.addEventListener('click', () => {
	updateBrazo();
	setTimeout(() => musicBg.play(), 1000);
});

buttonPause.addEventListener('click', () => {
	musicBg.pause();
	stopBrazo();
});

const spinVinyl = () => vinylAnimation.play();
const stopVinyl = () => vinylAnimation.pause();

const stopBrazo = () => {
	clearInterval(intervalMusicPlaying);
	brazo.style.transform = 'rotate(0deg)';
};
function getBrazoDeg() {
	if (isNaN(musicBg.duration) || musicBg.currentTime <= 0) return 32;
	const h = 160 - Math.round((160 * musicBg.currentTime) / musicBg.duration);
	const radianes = Math.atan(h / 300);
	const deg = radianes / (Math.PI / 180);
	return deg + 5;
}
const setBrazo = (n) => {
	brazo.style.transform = 'rotate(' + n + 'deg)';
};
function updateBrazo() {
	intervalMusicPlaying = setInterval(() => {
		setBrazo(getBrazoDeg());
	}, 500);
}
