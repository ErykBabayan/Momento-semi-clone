const photoAuthor = document.getElementById("photo-author");
const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const weather = document.getElementById("weather-container");
//api handling loading images

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
	.then((response) => {
		if (!response.ok) {
			console.log(response.status);
			throw Error("Something went wrong");
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
		if (window.innerWidth < 1000) {
			document.body.style.backgroundImage = `url(${data.urls.regular})`;
			photoAuthor.textContent = `By: ${data.user.name}`;
		} else {
			document.body.style.backgroundImage = `url(${data.urls.full})`;
			photoAuthor.textContent = `By: ${data.user.name}`;
		}
	})
	.catch((err) => {
		document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1466133633688-187f0b492390?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDE4NDk0NzI&ixlib=rb-1.2.1&q=85)`;
		photoAuthor.textcontent = "Author: Jean-Pierre Brungs";
	});

//api handling quotes

fetch("https://type.fit/api/quotes/")
	.then((response) => {
		if (!response.ok) {
			throw Error("Something went wrong");
		}
		return response.json();
	})
	.then((data) => {
		const random = Math.floor(Math.random() * data.length); // get random quote as api doesn't provide it
		console.log(data[random]);
		quote.textContent = `${data[random].text}`;
		if (data[random].author) {
			quoteAuthor.textContent = `${data[random].author}`;
		}
	})
	.catch((err) => {
		quote.textContent = "Just keep programing";
	});

// api handling weather

navigator.geolocation.getCurrentPosition((position) => {
	fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
		.then((response) => {
			if (!response.ok) {
				throw Error("Can't provide weather data");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			document.getElementById("weather-container").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º </p>
                <p class="weather-city">${data.name}</p>`;
		})
		.catch((error) => {
			document.getElementById("weather-container").innerHTML = `
                <p class="weather-city">Something went wrong</p>`;
		});
});
