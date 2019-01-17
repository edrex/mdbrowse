var md = require('marked')


function handleContentString(s) {
		document.body.innerHTML = md(s);
}
function handleNotFound(response) {
}

function handleResponse(response) {
	console.log(response);
	if (response.ok) {
		response.text().then(handleContentString);
	} else {
		handleContentString(`Error ${response.status}: ${response.statusText}`);
	}	
}

function handleLocationHash() {
	console.log(location.hash);
	if (location.hash.length > 1) {
		fetch(location.hash.slice(1))
			.then(handleResponse)
			.catch((s) => {console.log(`Fetch error: ${s}`)});
	}
}

handleLocationHash()
window.onhashchange = handleLocationHash;
//module.exports = app.mount('body')
