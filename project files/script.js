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
		} else {
			document.body.style.backgroundImage = `url(${data.urls.regular})`;
		}
	})
	.catch((err) => {
		document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1466133633688-187f0b492390?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDE4NDk0NzI&ixlib=rb-1.2.1&q=85)`;
		photoAuthor.textcontent = "Jean-Pierre Brungs";
	});
