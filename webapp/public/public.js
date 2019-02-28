//GLOBALS
let sorting = "Newest";
window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
	}

};

function createPoll(){
	createPersonalPoll();
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

	// console.log(personal + "\n" + challenge + "\n" + title + "\n" + theme + "\n" + duration + "\n" + imageOne + "\n" + imageTwo + "\n" + private + "\n" + public)


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
		console.log("Personal");
	}
	else{
		console.log("Challenge")
		document.getElementById("imageTwo").classList.add("invisible");
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
		window.location.href = "/splash";

}


function createPersonalPoll(){
	// display_name needs to be changed to title after the API is fixed in the html in create new poll
	var url = "/api/poll/personal";

	const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            sessionStorage.setItem('pollId', response.data);
            console.log("worked")
            showCurrentPoll();
		} else {
            // handle error
            console.log("no work");

            console.log(response);
		}
	}

    xhr.send(new FormData(document.getElementById('newPollForm')));


}

function showCurrentPoll(){
	var url = '/api/poll/'
	 const id = sessionStorage.getItem('pollId');

	const xhr  = new XMLHttpRequest();
	xhr.open('GET', url + id);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    
	xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            console.log("pull worked")
            console.log(response);
            var img = new Image();
			img.src = response.data.image_1;
			 document.getElementById("cardLeft").appendChild(img);
			  
			var img = new Image();
			img.src = response.data.image_2;
			document.getElementById("cardRight").appendChild(img);

			document.getElementById("titleP").innerHTML = response.data.display_name;
			document.getElementById("leftUsername").innerHTML = response.data.display_name;
			document.getElementById("rightUsername").innerHTML = response.data.display_name;
			document.getElementById("themes").innerHTML = response.data.theme;

		} else {
            // handle error
            console.log(response);
		}
    }
    
	xhr.send(null);
}


function createChallengeRequest(){
post

}


function getChallengeRequests(){
get


}


function acceptChallengeRequest(){

put

}

function listOfPolls(){

get

}


function setVote(){

put

}






