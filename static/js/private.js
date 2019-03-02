//GLOBALS
let sorting = "Newest";
let friends = [];

window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
	else{
		
	}
	getFriends();
};

function createPoll(){

	let personal = document.getElementById("personalButton").classList.contains("active");
	let challenge = document.getElementById("challengeButton").classList.contains("active");

	let title = document.getElementById("titleInput").value;
	let theme = document.getElementById("themeInput");
	theme = theme.options[theme.selectedIndex].innerHTML;
	let duration = document.getElementById("durationDay").value + "-" + document.getElementById("durationHour").value + "-" +  document.getElementById("durationMin").value;
	let imageOne = document.getElementById("imageOne").value;

	if(personal){
		let imageTwo = document.getElementById("imageTwo").value;
	}
	let private = document.getElementById("privateButton").classList.contains("active");
	let public = document.getElementById("publicButton").classList.contains("active");

	console.log(personal + "\n" + challenge + "\n" + title + "\n" + theme + "\n" + duration + "\n" + imageOne + "\n" + imageTwo + "\n" + private + "\n" + public)
}

function verifyCreatepollInput(title, theme, experiation, imageOne, imageTwo, privacy){
	var has_error = false;

	if(has_error){
		return 0;
	}
	return 1;
}

function switchPollType(input){
	if(input === "Personal"){
		document.getElementById("imageTwo").classList.remove("invisible");
		document.getElementById("selectChallenge").classList.add("invisible");
		console.log("Personal");
	}
	else{
		console.log("Challenge")
		document.getElementById("imageTwo").classList.add("invisible");
		document.getElementById("selectChallenge").classList.remove("invisible");
	}
}

function movePoll(direction){
	if(direction < 0){
		console.log("Move Left");
	}
	else{
		console.log("Move Right");
	}
}

function updateSort(sort){
	sorting = sort;
	console.log(sorting);
}

function changeSort(){
	console.log("Sorting submitted: " + sorting);
}

function search(){
	let themes = document.getElementById("themePicker");
	themes.getElementsByClassName('btn dropdown-toggle btn-light')[0].getAttribute("title");
	console.log("Search criteria: " + themes);
}

function vote(side){
	if(side == "left"){
		console.log("Voted Left");
	}
	else{
		console.log("Voted Right");
	}
	document.getElementById("cardContentOverlay").classList.remove("invisible");
}

function logout(){
	console.log("logout");
	localStorage.removeItem("token");
	localStorage.removeItem("displayName");
	localStorage.removeItem("username");
	localStorage.removeItem("emoji");
	localStorage.removeItem("WinRate");
	localStorage.removeItem("TikiTally");
	localStorage.removeItem("PollsCreated");
	window.location.href = "/";

}

function getFriends(){
	var url  = "/api/user/friend";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			friends = users.data;
			console
			//Populate HTML
			let runningTable = ``;
			let dataSet = document.getElementById("friendsList");
			for(let i = 0; i < users.data.length; i++){
				runningTable += `<option value="${users.data[i].username}">`;
			}
			dataSet.innerHTML = runningTable;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}
