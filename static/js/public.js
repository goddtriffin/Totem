//GLOBALS
let sorting = "asc";
let publicPolls = [];
let place_holder = 0;
let friends = [];
let current_poll_id = 1;
let leftPercentage = 0;
let rightPercentage = 0;
let has_Voted = false;
let recall = 0;

window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
	else{
		getFriends();
		listOfPolls(0);
		// console.log(publicPolls)
		switchPollType('Personal');
	}
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
		localStorage.pollType = 0;
	}
	else{
		localStorage.pollType = 1;
	}
}

function movePoll(direction){
	if(direction < 0){
		if(place_holder == 0){}
		else{
			place_holder = place_holder-1;
			if(publicPolls.length == 0){
				getDisplayName(place_holder, null, null)	
			}
			else{
				getDisplayName(place_holder, publicPolls[place_holder].creator,publicPolls[place_holder].opponent )
			}
		}
	}
	else{
		if(publicPolls.length-1 == place_holder){}
		else{
			place_holder = place_holder+1;
			if(publicPolls.length == 0){
				getDisplayName(place_holder, null, null)	
			}
			else{
				getDisplayName(place_holder, publicPolls[place_holder].creator,publicPolls[place_holder].opponent )
			}

		}
	}
}

function showPoll(index, creatorDS, opponentDS){
		document.getElementById("viewpoll").classList.remove("invisible");
		document.getElementById("actual_card").classList.add("invisible");
		document.getElementById("no_polls").classList.add("invisible");

		if(publicPolls.length != 0){
			document.getElementById("actual_card").classList.remove("invisible");

			// console.log("==========================")
			// console.log(publicPolls[index].duration)
			// console.log("this index is "+index)
			current_poll_id = publicPolls[index].id;
			// console.log("this is poll id number: " +publicPolls[index].id)
			// console.log("Poll duration: ");
			// console.log(publicPolls[index])
 			document.getElementById("leftDisplayName").innerHTML = creatorDS;
			document.getElementById("rightDisplayName").innerHTML = opponentDS;



			if(publicPolls[index].hasOwnProperty('voted')){
				calculateVotes(current_poll_id)
				// console.log("GRAPH");
				//uncomment to show graph
				document.getElementById("cardContentOverlay").classList.remove("invisible");
				document.getElementById("leftImg").classList.add("opacity");
				document.getElementById("rightImg").classList.add("opacity");
				//graph

				// Set vote color
				// left
				if(publicPolls[index].voted === 1){
					document.getElementById("leftResults").style.background = "rgba(255, 255, 255, 0.80)";
					document.getElementById("leftResults").style.color = "black";

					document.getElementById("rightResults").style.background = "rgba(255, 255, 255, 0.5)";
					document.getElementById("rightResults").style.color = "white";
				}
				// right
				else{
					document.getElementById("rightResults").style.background = "rgba(255, 255, 255, 0.80)";
					document.getElementById("rightResults").style.color = "black";

					document.getElementById("leftResults").style.background = "rgba(255, 255, 255, 0.5)";
					document.getElementById("leftResults").style.color = "white";
				}
			}
			else{
				document.getElementById("cardContentOverlay").classList.add("invisible");
				document.getElementById("leftImg").classList.remove("opacity");
				document.getElementById("rightImg").classList.remove("opacity");
			}
			
			var img = new Image();
			img.src = publicPolls[index].image_1;
			document.getElementById("leftImg").src = publicPolls[index].image_1;
			  
			var img = new Image();
			img.src = publicPolls[index].image_2;
			document.getElementById("rightImg").src = publicPolls[index].image_2;

			document.getElementById("titleP").innerHTML = publicPolls[index].display_name;
			document.getElementById("leftUsername").innerHTML = publicPolls[index].creator;

			document.getElementById("themes").innerHTML = publicPolls[index].theme;

			if(publicPolls[index].type === "personal"){
				document.getElementById("rightUser").classList.add("invisible");
			}
			else{
				document.getElementById("rightUser").classList.remove("invisible");
				document.getElementById("rightUsername").innerHTML = publicPolls[index].opponent;
			}
		}
		else{
			//no polls display
			document.getElementById("no_polls").classList.remove("invisible");
		}
}

function updateSort(sort){
	sorting = sort;
	// // console.log(sorting);
}

function changeSort(){
	// console.log("Sorting submitted: " + sorting);
	listOfPolls(0,sorting);

}

function search(index){
	let themePicker = document.getElementById("themePicker");
	let themes = getSelectValues(themePicker);
	// console.log("Search criteria: " + themes);

	if(themes.length !== 0 && themes != "Select a theme"){
		let url = '/api/poll/search/public?themes='+themes;

		const xhr  = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
		xhr.onload = function () {
			const response = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				// console.log("Search Results");
				// console.log(response.data);

				// Replace poll list
				publicPolls = response.data;	
				// console.log(publicPolls);	
				if(publicPolls.length == 0){
					getDisplayName(0, null, null)	
				}
				else{
					getDisplayName(0, publicPolls[0].creator, publicPolls[0].opponent)
				}
			} else {
				// handle error
				// console.log(response);
			}
		}
		
		xhr.send(null);
	}
	else{
		// Normal list call
		listOfPolls(index);
	}
}

function getSelectValues(select) {
	var result = [];
	var options = select && select.options;
	var opt;
  
	for (var i=0, iLen=options.length; i<iLen; i++) {
	  opt = options[i];
  
	  if (opt.selected) {
		result.push(opt.value);
	  }
	}
	return result;
  }

function vote(side){
	if(side == "Left"){
		// // console.log("Voted Left");
		setVote(1, current_poll_id)
	}
	else{
		// // console.log("Voted Right");
		setVote(2, current_poll_id)

	}
	//uncomment to show graph
	document.getElementById("cardContentOverlay").classList.remove("invisible");
	document.getElementById("leftImg").classList.add("opacity");
	document.getElementById("rightImg").classList.add("opacity");
}

function logout(){
	// // console.log("logout");
	localStorage.removeItem("token");
	localStorage.removeItem("displayName");
	localStorage.removeItem("username");
	localStorage.removeItem("emoji");
	localStorage.removeItem("WinRate");
	localStorage.removeItem("TikiTally");
	localStorage.removeItem("PollsCreated");
	window.location.href = "/";

}

function createPollCall(){
	// console.log("create poll called")
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
	// console.log("create personal poll called")

	var url = "/api/poll/personal";

	const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			            // console.log(response);

            // handle success
            sessionStorage.setItem('pollId', response.data);
            listOfPolls(0)
		} else {
            // console.log(response);
		}
	}
	document.getElementById("imageOne").setAttribute("name", "image_1");

	// Calculate Duration
	let days = document.getElementById("durationDay").value;
	let hours = document.getElementById("durationHour").value;
	let minutes = document.getElementById("durationMin").value;
	let duration = (days * 24 * 60) + (hours * 60) + (minutes * 1);

	var formData = new FormData(document.getElementById('newPollForm'));
	formData.set("duration", duration);

	formData.append("username", localStorage.username);
		xhr.send(formData);
		
		// clear inputs
	document.getElementById("newPollForm").reset();

}

function createChallengeRequest(){
	var url = "/api/poll/challenge";

	const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

    xhr.onload = function () {
		var response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            sessionStorage.setItem('pollId', response.data);
		} else {
            // console.log(response);
		}
	}
	document.getElementById("imageOne").setAttribute("name", "image");

	// Calculate Duration
	let days = document.getElementById("durationDay").value;
	let hours = document.getElementById("durationHour").value;
	let minutes = document.getElementById("durationMin").value;
	let duration = (days * 24 * 60) + (hours * 60) + (minutes * 1);

	var formData = new FormData(document.getElementById('newPollForm'));
	formData.set("duration", duration);

	formData.append("creator", localStorage.username);
	// console.log(formData)
		xhr.send(formData)
		
		// clear inputs
	document.getElementById("newPollForm").reset();

}


function listOfPolls(location){
	const xhr  = new XMLHttpRequest();
	// // console.log(sort_type)
	let url = "/api/feed/public?sort="
	xhr.open('GET', url+sorting);
	// console.log(url+sorting)
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    
	xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			// console.log(response.data)
			publicPolls = response.data;
			if(publicPolls.length == 0){
				getDisplayName(location, null, null)	
			}
			else{
				getDisplayName(location, publicPolls[location].creator,publicPolls[location].opponent )
			}

            
		} else {
            // handle error
            // console.log(response);
		}
    }
    
	xhr.send(null);

}


function setVote(who, index){
	var url = "/api/poll/vote/";

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
			//calcualting percentage
			calculateVotes(index);
			// listOfPolls(place_holder);
			search(place_holder);

		} else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function calculateVotes(id){
	const xhr  = new XMLHttpRequest();
	xhr.open('GET', '/api/poll/' + id);
	// console.log(id)
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    
	xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			var total = response.data.votes_1 + response.data.votes_2;
			// console.log("TOTAL: " + total + "LEFT: " + response.data.votes_1 + " RIGHT: " + response.data.votes_2);
			 leftPercentage = (response.data.votes_1 / total) * 100.0;
			 rightPercentage = (response.data.votes_2/ total) * 100.0;
			 // uncomment after voting is done
			setPercentages();
		  
		} else {
            // handle error
            // console.log(response);
		}
    }
    
	xhr.send(null);
}

function setPercentages(){
	// console.log("LEFT: " + leftPercentage + " RIGHT: " + rightPercentage);
	document.getElementById("leftBlank").style.height = (100 - leftPercentage) + "%";
	document.getElementById("rightBlank").style.height = (100 - rightPercentage) + "%";

	document.getElementById("leftResults").style.height = leftPercentage + "%";
	document.getElementById("rightResults").style.height = rightPercentage + "%";

	document.getElementById("resultTextLeft").innerHTML = leftPercentage + "%";
	document.getElementById("resultTextRight").innerHTML = rightPercentage + "%";

}

function getFriends(){
	var url  = "/api/user/friend";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			friends = users.data;
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

function getDisplayName(index, username1, username2){
	//creator
	if(username1 != null){
		// console.log("display name search was done for: "+username1)
		var url  = "/api/user/profile/";
		var xhr1  = new XMLHttpRequest()

		xhr1.open('GET', url+username1, true)
		xhr1.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

		xhr1.onload = function () {
			var users1 = JSON.parse(xhr1.responseText);
			if (xhr1.readyState == 4 && xhr1.status == "200") {			
				if(username2 != null){
					//opponent
					// console.log("display name search was done for: "+username2)
					var url  = "/api/user/profile/";
					var xhr2  = new XMLHttpRequest()

					xhr2.open('GET', url+username2, true)
					xhr2.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

					xhr2.onload = function () {
						var users2 = JSON.parse(xhr2.responseText);
						if (xhr2.readyState == 4 && xhr2.status == "200") {
							localStorage.poll_displayname_C = users1.data.display_name;
							localStorage.poll_displayname_O = users2.data.display_name;	
							showPoll(index, users1.data.display_name, users2.data.display_name);				

						} else {
							console.error(users2);
						}
					}	
					xhr2.send(null);
				}
				else{
					localStorage.poll_displayname_C = users1.data.display_name;
					showPoll(index, users1.data.display_name, null);				


				}

			} else {
				console.error(users1);
			}
		}	
		xhr1.send(null);	
	}
	else{
		document.getElementById("viewpoll").classList.add("invisible");
	}

}
