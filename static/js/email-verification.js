window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
};