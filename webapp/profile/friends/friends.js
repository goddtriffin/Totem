let friendRequest = [];
let searchResults = [];
let friends = [];
var username_to_request = 0;
var user_request = "";

function load() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
	  	loadFriends();
	  	loadFriendRequest();
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
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			friends = users.data;
			console
			//Populate HTML
			let runningTable = ``;
			let tableBody = document.getElementById("friendTableBody");
			for(let i = 0; i < users.data.length; i++){
				runningTable += `
					<tr>
						<td>${users.data[i].emoji}</td>
						<th scope="row">${users.data[i].username}</th>  
						<td>${users.data[i].display_name}</td>
						<td>${users.data[i].tiki_tally}</td>
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
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			//Populate HTML
			console.table(users);

			//Set global 
			friendRequests = users.data;

			let runningTable = ``;
			let tableBody = document.getElementById("friendRequestTableBody");
			for(let i = 0; i < users.data.length; i++){
				user_request = users.data[i].username;
				console.log()
				runningTable += `
					<tr>
						<th scope="row" id="friend_request_username-${i}">${users.data[i].username}</th>  
						<td>${users.data[i].display_name}</td>
						<td>${users.data[i].tiki_tally}</td>
						<td>
							<button class="btn btn-success" onclick="acceptFriend(${i})">Accept</button>
						</td>
						<td>
							<button class="btn btn-danger" onclick="deleteFriend(${i})">Reject</button>
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
	console.log("requesting friend");

	var url = "/api/user/friend";

	// console.log(request_user)

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
			console.log(users);
			loadFriends();
	  		loadFriendRequest();
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
	console.log(index);
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
			console.log(users);
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
			console.log(users);
			loadFriends();
	  		loadFriendRequest();
		} else {
			console.error(users);
		}
	}
	xhr.send(json);

}

function searchfriends(){
	var url  = "/api/user/search?username=";
	var xhr  = new XMLHttpRequest()

	let usernameSearch = document.getElementById("searchBar").value;

	xhr.open('GET', url+usernameSearch, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			searchResults = users.data;

			console.log(users)
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

// Dont think we need this anymore
function viewFriendProfile(index){

	var url  = "/api/user/profile/";
	var xhr  = new XMLHttpRequest();
	let friend_username = friends[index].username;

	xhr.open('GET', url+friend_username, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			searchResults = users.data;
			console.log(users)
		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}