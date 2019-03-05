window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
};

function logout(){
	// console.log("logout");
	localStorage.removeItem("token");
	localStorage.removeItem("displayName");
	localStorage.removeItem("username");
	localStorage.removeItem("emoji");
	localStorage.removeItem("WinRate");
	localStorage.removeItem("TikiTally");
	localStorage.removeItem("PollsCreated");
	window.location.href = "/";

}