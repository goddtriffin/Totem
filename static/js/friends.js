let friendRequest = [];
let searchResults = [];
let friends = [];
let friends_username = [];
var username_to_request = 0;
var user_request = "";

function load() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/");
	}
	else{
	  	loadFriends();
	  	loadFriendRequest();
	  	//addFriend();
	}
};

function loadFriends(){
	getFriends();
}

function loadFriendRequest(){
	getFriendRequests();
}

function getFriends(){
	var url  = "/api/user/friend";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	
	xhr.onload = function () {
		// console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			friend_username = [];
			friends = users.data;
			//Populate HTML
			let runningTable = ``;
			let tableBody = document.getElementById("friendTableBody");
			for(let i = 0; i < users.data.length; i++){
				friend_username.push(users.data[i].username)
				runningTable += `
					<tr>
						<td>${users.data[i].emoji}</td>
						<th scope="row">${users.data[i].username}</th>  
						<td>${users.data[i].display_name}</td>
						<td>${users.data[i].tiki_tally * 2}</td>
					</tr>`;
			}
			tableBody.innerHTML = runningTable;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}

function getFriendRequests(){
	var url  = "/api/user/friend/requests";
	var xhr  = new XMLHttpRequest();

	xhr.open('GET', url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		// console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			//Populate HTML
			//console.table(users);

			//Set global 
			friendRequests = users.data.received;

			let runningTable = ``;
			let tableBody = document.getElementById("friendRequestTableBody");
			for(let i = 0; i < users.data.received.length; i++){
				user_request = users.data.received[i].username;
				// console.log()
				runningTable += `
					<tr>
						<th scope="row" id="friend_request_username-${i}">${users.data.received[i].username}</th>  
						<td>${users.data.received[i].display_name}</td>
						<td>${users.data.received[i].tiki_tally}</td>
						<td>
							<button class="btn btn-success" onclick="acceptFriend(${i})">Accept</button>
						</td>
						<td>
							<button class="btn btn-danger" onclick="acceptFriend(${i})">Reject</button>
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

function requestFriend(index){
	// console.log("requesting friend");

	var url = "/api/user/friend";

	// // console.log(request_user)

	var data = {};
	data.friend_username= searchResults[index].username;

	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			//// console.log(users);
			loadFriends();
	  		loadFriendRequest();
	  		searchfriends();
		} 
		else if(xhr.status == "409"){
		}
		else {
			console.error(users);
		}
	}
	
	xhr.send(json);
}

function acceptFriend(index){
	var url = "/api/user/friend";
	// console.log(index);
	let friend_username = friendRequests[index].username;

	var data = {};
	data.friend_username = friend_username;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			//// console.log(users);
			loadFriends();
	  		loadFriendRequest();
		} else if(xhr.status == "400"){ 
			
		}
		else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function deleteFriend(index){
	var url = "/api/user/friend";

	let friend_username = friendRequests[index].username;

	var data = {};
	data.friend_username= friend_username;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			//// console.log(users);
			loadFriends();
	  		loadFriendRequest();
		} else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function searchfriends(){
	let usernameSearch = document.getElementById("searchBar").value;
	// console.log("the length of the search was" +usernameSearch.length)
	if(usernameSearch.length > 0){
		var url  = "/api/user/search?username=";
		var xhr  = new XMLHttpRequest()

		xhr.open('GET', url+usernameSearch, true)
		xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

		xhr.onload = function () {
			// console.log(xhr.responseText);
			var users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				searchResults = users.data;

				//// console.log(users)
				//Populate HTML
				let runningTable = ``;
				let tableBody = document.getElementById("searchTable");
				for(let i = 0; i < users.data.length; i++){
					runningTable += `
						<tr>
							<th scope="row">${users.data[i].username}</th>  
							<td>${users.data[i].display_name}</td>
							<td>${users.data[i].tiki_tally}</td>
							<td><button class="btn btn-success" onclick="requestFriend(${i})">Add Friend</button> </td>
						</tr>`;
				}
				tableBody.innerHTML = runningTable;
			} else {
				console.error(users);
			}
		}	
		xhr.send(null);
	}
	else{
		let runningTable = ``;
		let tableBody = document.getElementById("searchTable");
		runningTable += `
						<tr>
						</tr>`;
		tableBody.innerHTML = runningTable;
	}
}
