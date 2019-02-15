
window.onload = function() {
	console.log("onload worked");
  fillUserInfo();

};


function fillUserInfo(){
	var url  = "http://localhost:3000/api/user/me";
var xhr  = new XMLHttpRequest()

xhr.open('GET', url, true)
xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

xhr.onload = function () {
	console.log(xhr.responseText);
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
		console.log(users);
		document.getElementById("displayName").innerHTML = users.data.display_name;
		document.getElementById("username").innerHTML = users.data.username;
		
		//TODO: @CameronGlass 
		// fix the positioning of the emoji at the top of the pagew
		document.getElementById("emoji").innerHTML = users.data.emoji;
		
		//TODO: @CameronGlass 
		//Move data to HTML --> you need to create the place and give it the ids listed below. These will 
		//return the numbers automatically when the page is loaded. 
		/*
		document.getElementById("WinRate").innerHTML = users.data.friend_challenges_won/users.data.friend_challenges;
		document.getElementById("TikiTally").innerHTML = users.data.tiki_tally;
		document.getElementById("PollsCreated").innerHTML = users.data.polls_created;
		*/



	} else {
		console.error(users);
	}
}
xhr.send(null);


}




function logout(){
	localStorage.removeItem(token);
	window.location.href = '../splash';
}