fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (window.innerWidth < 1000) {
			document.body.style.backgroundImage = `url(${data.urls.regular})`;
		} else {
			document.body.style.backgroundImage = `url(${data.urls.full})`;
		}
	});
