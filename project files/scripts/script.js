const photoAuthor = document.getElementById("photo-author");
const quote = document.getElementById("quote");
const qouteAuthor = document.getElementById("quote-author");

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
			document.body.style.backgroundImage = `url(${data.urls.regular})`;
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
		//console.log(data);
		quote.textContent = `${data[random].text}`;
		qouteAuthor.textContent = `-${data[random].author}`;
	})
	.catch((err) => {
		quote.textContent = "Just keep programing";
	});
