function loadchallenges() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
	  	loadChallengesRecieved();
	  	// loadChallengesSent();
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
			let runningTable = ``;
			let tableBody = document.getElementById("challengesRequests");
			for(let i = 0; i < users.data.length; i++){
				runningTable += `<tr>
  								<th scope="row">@${users.data[i].username}</th>  
                                <td>${users.data[i].display_name}</td>
                                <td>${users.data[i].theme}</td>
                                <td>${users.data[i].duration}</td>
                                <td>${users.data[i].privacy}</td>
                                </tr>`;
                                          
			}
			tableBody.innerHTML = runningTable;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);

}

function loadChallengesSent(){



}