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
			console.log(users);
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
			console.log(users);	
		} else {
			console.error(users);
		}
	}	
	xhr.send(null);

}

function requestFriend(friend_username){


	var url = "/api/user/friend";

	var data = {};
	data.friend_username= friend_username;

	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);
		} 
		else if(xhr.status == "409"){
		}
		else {
			console.error(users);
		}
	}
	
	xhr.send(json);

}

function acceptFriend(friend_request_username){
	var url = "/api/user/friend";

	var data = {};
	data.friend_username = friend_request_username;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);
		} else if(xhr.status == "400"){ 

		}
		else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function deleteFriend(friend_username){
	var url = "/api/user/friend";

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
		} else {
			console.error(users);
		}
	}
	xhr.send(json);
}