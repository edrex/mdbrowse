function handleLocationHash() {
	document.body.innerHTML = location.hash;
}

handleLocationHash()
window.onhashchange = handleLocationHash;
module.exports = app.mount('body')
