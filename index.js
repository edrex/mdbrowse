function handleLocationHash() {
	console.log("location.hash: " + location.hash);
}

handleLocationHash()
window.onhashchange = handleLocationHash;
//module.exports = app.mount('body')
