

function logout(){
	console.log("logout");
	localStorage.removeItem(localStorage.token);
	window.location.href = "../splash";

}
