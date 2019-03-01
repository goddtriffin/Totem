//GLOBALS
let sorting = "Newest";
let publicPolls = [];
let place_holder = 0;
let friends = [];
let current_poll_id = 0;

window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
		listOfPolls();
	}
	getFriends();

};

function createPoll(){
	createPollCall();
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
	console.log(private)
	console.log(public)
	// console.log(personal + "\n" + challenge + "\n" + title + "\n" + theme + "\n" + duration + "\n" + imageOne + "\n" + imageTwo + "\n" + private + "\n" + public)

	localStorage.theme = document.getElementById("themeInput");
	localStorage.duration = document.getElementById("durationMin").value
	localStorage.image = document.getElementById("imageOne").value;
	if(private){
		localStorage.scope = "private"
	}
	else{
		localStorage.scope = "public"
	}
	
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
		localStorage.pollType = 0;
	}
	else{
		console.log("Challenge")
		document.getElementById("imageTwo").classList.add("invisible");
		localStorage.pollType = 1;
		document.getElementById("selectChallenge").classList.remove("invisible");
	}
}

function movePoll(direction){
	if(direction < 0){
		console.log("Move Left");
		if(place_holder == 0){
			showPoll(place_holder)
		}
		else{
			place_holder = place_holder-1;
			showPoll(place_holder)
			document.getElementById("cardContentOverlay").classList.add("invisible");
			document.getElementById("leftImg").classList.remove("opacity");
			document.getElementById("rightImg").classList.remove("opacity");
		}

	}
	else{
		console.log("Move Right");
		if(publicPolls.length == place_holder-1){
			showPoll(place_holder)
		}
		else{
			place_holder = place_holder+1;
			showPoll(place_holder)
			document.getElementById("cardContentOverlay").classList.add("invisible");
			document.getElementById("leftImg").classList.remove("opacity");
			document.getElementById("rightImg").classList.remove("opacity");
		}
	}
}

function showPoll(index){
			current_poll_id = publicPolls[index].id;
			console.log(current_poll_id)
			console.log(publicPolls[index].votes_1)
			console.log(publicPolls[index].votes_2)
			var img = new Image();

			img.src = publicPolls[index].image_1;
			 document.getElementById("leftImg").src = publicPolls[index].image_1;
			  
			var img = new Image();
			img.src = publicPolls[index].image_2;
			document.getElementById("rightImg").src = publicPolls[index].image_2;

			document.getElementById("titleP").innerHTML = publicPolls[index].display_name;
			document.getElementById("leftUsername").innerHTML = publicPolls[index].creator;
			// leftDisplayName

			document.getElementById("themes").innerHTML = publicPolls[index].theme;
			// document.getElementById("leftDisplayName").innerHTML = publicPolls[index].display_Name;

			if(publicPolls[index].type === "personal"){
				document.getElementById("rightUser").classList.add("invisible");
			}
			else{
				document.getElementById("rightUser").classList.remove("invisible");
				// rightDisplayName
				document.getElementById("rightUsername").innerHTML = publicPolls[index].opponent;
			}
			console.log("what is state");
			console.log(publicPolls[index])
			


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
	document.getElementById("leftImg").classList.add("opacity");
	document.getElementById("rightImg").classList.add("opacity");
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

function createPollCall(){
	console.log(localStorage.pollType)
	if(localStorage.pollType == 0){
		createPersonalPoll()
		localStorage.removeItem("poll");
	}
	else{
		createChallengeRequest();
		localStorage.removeItem("poll");
	}
}

function createPersonalPoll(){
	console.log("personal poll was requested");

	// display_name needs to be changed to title after the API is fixed in the html in create new poll
	var url = "/api/poll/personal";

	const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    // xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            sessionStorage.setItem('pollId', response.data);
            console.log("worked")
            showCurrentPollPersonal();
            listOfPolls();
		} else {
            // handle error
            console.log("no work");
            console.log(response);
		}
	}
	document.getElementById("imageOne").setAttribute("name", "image_1");
	var formData = new FormData(document.getElementById('newPollForm'));

	formData.append("username", localStorage.username);
	// formData.append("display_name", localStorage.displayName);
	console.log(formData)
    xhr.send(formData);

}

function showCurrentPollPersonal(){
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
			 document.getElementById("leftImg").src = response.data.image_1;
			  
			var img = new Image();
			img.src = response.data.image_2;
			document.getElementById("rightImg").src = response.data.image_2;

			document.getElementById("titleP").innerHTML = response.data.display_name;
			document.getElementById("leftUsername").innerHTML = response.data.creator;
			// leftDisplayName

			document.getElementById("themes").innerHTML = response.data.theme;
			// document.getElementById("leftDisplayName").innerHTML = publicPolls[index].display_Name;

			document.getElementById("rightUser").classList.add("invisible");
			

		} else {
            // handle error
            console.log(response);
		}
    }
    
	xhr.send(null);
}


function showCurrentPollChallenge(){


	/*
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
			document.getElementById("leftUsername").innerHTML = localStorage.username;
			document.getElementById("themes").innerHTML = response.data.theme;
			document.getElementById("leftDisplayName").innerHTML = localStorage.displayName


		} else {
            // handle error
            console.log(response);
		}
    }
    
	xhr.send(null);


	*/
}


function createChallengeRequest(){
	console.log("challenge was requested");
	// post
	// display_name needs to be changed to title after the API is fixed in the html in create new poll
	var url = "/api/poll/challenge";

	const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
	// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.onload = function () {
      console.log(xhr.responseText);
		var response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            sessionStorage.setItem('pollId', response.data);
            console.log("worked")
            // showCurrentPollPersonal();
            listOfPolls();
		} else {
            // handle error
            console.log("no work");
            console.log(response);
		}
	}
	document.getElementById("imageOne").setAttribute("name", "image");
		var formData = new FormData(document.getElementById('newPollForm'));

	formData.append("username", localStorage.username);
	// formData.append("display_name", localStorage.displayName);
	console.log(formData)
    xhr.send(formData)

}




function listOfPolls(){


	const xhr  = new XMLHttpRequest();
	xhr.open('GET', '/api/feed/public');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    
	xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			publicPolls = response.data;
			showPoll(0);
            
		} else {
            // handle error
            console.log(response);
		}
    }
    
	xhr.send(null);

}


function setVote(who){
	var url = "/api/poll/vote/:";

	var data = {};
	data.vote = who;
	var json = JSON.stringify(data);


	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+current_poll_id, true);
	 xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			console.log(users);

			//calcualting percentage
			var total = publicPolls[place_holder].votes_1 + publicPolls[place_holder].votes_2;
			var leftPercentage = publicPolls[place_holder].votes_1 / total;
			var rightPercentage = publicPolls[place_holder].votes_2/ total;



		} else {
			console.error(users);
		}
	}
	xhr.send(json);

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






