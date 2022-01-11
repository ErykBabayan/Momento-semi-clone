const clock = document.getElementById("clock");
const interval = 1000;

let hours;
let minutes;

setInterval(() => {
	const date = new Date();
	hours = "0" + date.getHours();
	minutes = "0" + date.getMinutes();
	currentTime = `${date.getHours()} : ${date.getMinutes()}`;

	//adds a 0 before hours/mins if they are less than 10 ( for better visuals)
	if (date.getHours() < 10) {
		currentTime = `${hours} : ${date.getMinutes()}`;
	}
	if (date.getMinutes() < 10) {
		currentTime = `${date.getHours()} : ${minutes}`;
	}
	if (date.getHours() < 10 && date.getMinutes() < 10) {
		currentTime = `${hours} : ${minutes}`;
	}

	clock.textContent = currentTime;
}, interval);
