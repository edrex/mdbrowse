var md = require('marked')
var resolve = require('./resolve')

function pushState(path) {
	console.log(path)
	window.history.pushState({}, "", `#${path}`);
}

function mount(selector) {

	let target = document.querySelector(selector);
	if (!target) {
		throw new Error(`No element found for selector "${selector}"`);
	}

	let handleContentString = (s) => {
			target.innerHTML = md(s);
	}

	let handleResponse = (response) => {
		console.log(response);
		if (response.ok) {
			response.text().then(handleContentString);
		} else {
			handleContentString(`Error ${response.status}: ${response.statusText}`);
		}	
	}

	let requestLocation = () => {
		path = window.location.hash.slice(1)
		console.log(path);
		if ( path.length > 0 ) {
		fetch(path)
			.then(handleResponse)
			.catch((s) => {console.log(`Fetch error: ${s}`)});
		}
	}
	let handlePopState = (e) => {
		console.log(e)
		requestLocation(e.path)
	}

	let path = location.hash.slice(1);
	requestLocation();
	window.onpopstate = handlePopState;
	target.onclick = (e) => {
		var node = e.target;
		while (node != target && node.localName != 'a') {
			node = node.parentNode;
		}
		if (node != target && node.origin == window.location.origin && node.hash == "") {
			let oldPath = window.location.hash.slice(1);
			// get the raw href value
			let href = node.attributes.href.value;
			let newPath = resolve(oldPath, href);
			pushState(newPath);
			requestLocation();
			return false;  // stop handling the click
		} else {
			return true;  // handle other clicks
		}
	}
	return {};
}

module.exports = mount('body');
