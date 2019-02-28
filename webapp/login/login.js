window.onload = function() {
	if (localStorage.getItem("token") === null) {		
	}
	else{
	  	window.location.replace("/public");
	}
};


login = (username, password) => {
	if(verifyInput(username, password)){
		// move to next page
		console.log("move to next page");
		loginUser(username, password);
		return 1;
	}
	else{
		return 0;
	}
}

function loginUser(username, password){

var url = "/api/user/login";

	var data = {};
	data.username = username;
	data.password = password;

	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users.data);
			console.log(users);
			document.getElementById("GeneralError").innerHTML = "";
			localStorage.token = users.data;
			getUserInfo();
			window.location.href = '/profile';
		} 
		else if(xhr.status == "400"){
			document.getElementById("GeneralError").innerHTML = "Please correct info!";

		}
			else {
			console.error(users);
		}
	}
	
	xhr.send(json);

}


function getUserInfo(){
	var url  = "/api/user/me";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);
			localStorage.displayName = users.data.display_name
			localStorage.username = users.data.username
			localStorage.emoji = users.data.emoji
			localStorage.WinRate = users.data.friend_challenges_won/users.data.friend_challenges
			localStorage.TikiTally = users.data.tiki_tally
			localStorage.PollsCreated = users.data.polls_created

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);



}





function verifyInput(username, password){	
	var has_error = false;
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}

	//passwords
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}

	if(has_error){
		return 0;
	}
	return 1;
}

