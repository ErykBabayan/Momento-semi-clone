const photoAuthor = document.getElementById("photo-author");
const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const weather = document.getElementById("weather-container");
const finances = document.getElementById("finances");
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

const minuteInterval = 60000;
getFinancialData();
setInterval(getFinancialData, minuteInterval);

//api handling financial section
function getFinancialData() {
	const goldData = fetch("https://api.coingecko.com/api/v3/coins/tether-gold");
	//const usdData = fetch("https://api.coingecko.com/api/v3/coins/tether");
	const btcData = fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

	Promise.all([goldData, btcData])
		.then((values) => Promise.all(values.map((value) => value.json()))) // .map puszcza value => value.json() na kazdy element tablicy
		.then((finalVals) => {
			let goldData = finalVals[0];
			let btcData = finalVals[1];
			console.log(btcData);

			const goldPrice = goldData.market_data.current_price.usd;
			const gold24hChange = goldData.market_data.price_change_24h;
			const btcPrice = btcData.market_data.current_price.usd;
			const btc24hChange = btcData.market_data.price_change_24h;

			finances.innerHTML = `
				Your personal finances ▼
		
				<div class="finances-dashboard">
					<div class="finance-container">
						<img src="${goldData.image.small}" alt="asset thumbnail" class="fin-img"/>
						<div class="fin-price">$${troyOunceToGram(goldPrice)}</div>
						<div class="fin-daily-change" >${dailyPriceChange(goldPrice, gold24hChange)} %</div>
					</div>
					<div class="finance-container">
						<img src="${btcData.image.small}" alt="asset thumbnail" class="fin-img"/>
						<div class="fin-price">$${btcPrice}</div>
						<div class="fin-daily-change" >${dailyPriceChange(btcPrice, btc24hChange)} %</div>
					</div>
				</div>
				`;

			const price24hChange = document.getElementsByClassName("fin-daily-change");
			for (item in price24hChange) {
				if (price24hChange.item(item).value >= 0) {
					price24hChange.item(item).style.color = "green";
				} else {
					price24hChange.item(item).style.color = "red";
				}
			}
		});
}

function troyOunceToGram(price) {
	const troyOunce = 31.1034768;

	const priceInGrams = (price / troyOunce).toFixed(2);

	return priceInGrams;
}

function dailyPriceChange(currentPrice, priceChange24h) {
	procentage = ((priceChange24h / currentPrice) * 100).toFixed(2);
	return procentage;
}
