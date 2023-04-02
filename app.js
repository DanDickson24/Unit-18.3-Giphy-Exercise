console.log("Let's get this party started!");
const API_KEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';

const searchForm = document.getElementById('search-form');
const searchTermInput = document.getElementById('search-term');
const gifsContainer = document.getElementById('gifs-container');
const removeGifsButton = document.getElementById('remove-gifs');

let offset = 0;

searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const searchTerm = searchTermInput.value;
	if (searchTerm !== '') {
		searchGifs(searchTerm);
	}
});

removeGifsButton.addEventListener('click', () => {
	gifsContainer.innerHTML = '';
});

function searchGifs(searchTerm) {
	const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&offset=${offset}`;
	axios.get(url)
		.then(response => {
			const data = response.data;
			if (data.data.length > 0) {
				const gifUrl = data.data[0].images.original.url;
				const gifImg = document.createElement('img');
				gifImg.src = gifUrl;
				gifsContainer.appendChild(gifImg);
				offset += 1;
			}
		})
		.catch(error => {
			console.log(error);
		});
}