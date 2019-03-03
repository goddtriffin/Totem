function loadchallenges() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
	else{
	  	loadChallengesRecieved();
	  	// loadChallengesSent();
	  	console.log("accepted start")
		getAcceptedOnes()
	  	console.log("accepted end")
	}
};

function loadChallengesRecieved(){
    var url  = "/api/poll/challenge/requests";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			friends = users.data;
			// console
			//Populate HTML
			console.log(users.data)
			let runningTable = ``;
			let tableBody = document.getElementById("challengesRequests");
			for(let i = 0; i < users.data.length; i++){
				runningTable += ` 
					<tr>
						<th scope="row">@${users.data[i].creator}</th>  
						<td>${users.data[i].display_name}</td>
						<td>${users.data[i].theme}</td>
						<td>${users.data[i].duration}</td>
						<td>${users.data[i].privacy}</td>   
						<td>
							<input type="file" id="imageTwo-${users.data[i].id}" name="image_2" onchange="acceptChallenges(${users.data[i].id})"></input>
						</td>   
					</tr>`;
                                          
			}
			tableBody.innerHTML = runningTable;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}

function acceptChallenges(id){
    var url = "/api/poll/challenge/request/";

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+id, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);
			loadChallengesRecieved();

		} else {
			console.error(users);
		}
	}
	
    var formData = new FormData(document.getElementById('challengerequests'));
    formData.delete("image_2");
    formData.set("image", document.getElementById("imageTwo-"+id).files[0]);
    xhr.send(formData);
}

function getAcceptedOnes(){
    var url  = "/api/poll/challenge/requests/accepted";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			// console
			//Populate HTML
			let runningTable = ``;
			let tableBody = document.getElementById("acceptedRequests");
			for(let i = 0; i < users.data.length; i++){
				runningTable += ` 
					<tr>
						<th scope="row">@${users.data[i].opponent}</th>  
						<td>${users.data[i].display_name}</td>
						<td>${users.data[i].theme}</td>
						<td>${users.data[i].duration}</td>
						<td>${users.data[i].privacy}</td>   
						<td>
							<button class="btn btn-success" onclick="startChallenge(${users.data[i].id})">Start</button>
						</td>   
					</tr>`;
                                          
			}
			tableBody.innerHTML = runningTable;







			console.log(users.data)

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}

function startChallenge(id){
	// put
	// /api/poll/challenge/request/:id

	 var url = "/api/poll/challenge/request/";

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+id, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);

		} else {
			console.error(users);
		}
	}
    xhr.send(null);

}


function getSentChallenges(){




}

