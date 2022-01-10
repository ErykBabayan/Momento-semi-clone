const clock = document.getElementById("clock");
const date = new Date();
const interval = 1000;

setInterval(() => {
	currentTime = `${date.getHours()} : ${date.getMinutes()} `;
	clock.textContent = currentTime;
}, interval);
