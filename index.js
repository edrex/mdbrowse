var md = require('marked')

function mount(target) {

	let handleContentString = (s) => {
			target.innerHTML = md(s);
	}

	let handleResponse = (response) =>{
		console.log(response);
		if (response.ok) {
			response.text().then(handleContentString);
		} else {
			handleContentString(`Error ${response.status}: ${response.statusText}`);
		}	
	}

	let handleHash = () => {
		if ( location.hash.length > 1 ) {
		fetch(location.hash.slice(1))
			.then(handleResponse)
			.catch((s) => {console.log(`Fetch error: ${s}`)});
		}
	}

	handleHash();
	window.onhashchange = handleHash;
	return {};
}

module.exports = mount(document.body);
