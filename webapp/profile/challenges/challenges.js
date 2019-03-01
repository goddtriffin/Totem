function loadchallenges() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
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
	
// GET	/api/poll/challenge/requests
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
							<input type="file" id="imageTwo" name="image_2" onchange="loadChallengesSent(${users.data[i].id})"></input>
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

function loadChallengesSent(id){
	console.log("hellooooo")

	

 var url = "/api/poll/challenge/request/:";

	var data = {};
	// data.image = document.getElementById("image").src;
	// var json = JSON.stringify(data);


	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+id, true);
	 xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

	// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			console.log(users);
			console.log("yooo it worked")
			loadChallengesRecieved();
			console.log("accepted start")
			getAcceptedOnes()
	  		console.log("accepted end")


		} else {
			console.error(users);
		}
	}
	// xhr.send(json);
		// document.getElementById("image_id").setAttribute("name", "image");
		console.log("Image: " + document.getElementById("imageTwo").files[0]);
		var formData = new FormData(document.getElementById('challengerequests'));
		// console.log(formData.entries());
		formData.delete("image_2");
		formData.set("image", document.getElementById("imageTwo").files[0]);
		console.log("printing form");
		for (var pair of formData.entries()) {
    		console.log(pair[0]+ ', ' + pair[1]); 
		}
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
			friends = users.data;
			// console
			//Populate HTML
			console.log(users.data)
			

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);


}