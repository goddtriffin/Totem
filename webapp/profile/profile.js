let emojis = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛"];


// require("/Friends/friends.js")();

window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
	  	fillUserInfo();
		//Populate Emoji table
		loadEmojis();
	}
};

function fillUserInfo(){
	var url  = "/api/user/me";
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
			document.getElementById("emoji").innerHTML = users.data.emoji;
			
			// document.getElementById("WinRate").innerHTML = `Win Rate<br>`+ users.data.friend_challenges_won/users.data.friend_challenges;
			document.getElementById("TikiTally").innerHTML = `Tiki Tally<br>`+ users.data.tiki_tally;
			document.getElementById("PollsCreated").innerHTML = `Polls Created<br>`+ users.data.polls_created;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
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

function loadEmojis(){
	let table = document.getElementById("emojiTable");
	let tableContents = "";
	for(let i = 0; i < emojis.length; i += 5){
		let tr = `<tr>
			<td class="emoji" onclick="changeEmoji(${i})" data-dismiss="modal">${emojis[i]}</td>
			<td class="emoji" onclick="changeEmoji(${i+1})" data-dismiss="modal">${emojis[i+1]}</td>
			<td class="emoji" onclick="changeEmoji(${i+2})" data-dismiss="modal">${emojis[i+2]}</td>
			<td class="emoji" onclick="changeEmoji(${i+3})" data-dismiss="modal">${emojis[i+3]}</td>
			<td class="emoji" onclick="changeEmoji(${i+4})" data-dismiss="modal">${emojis[i+4]}</td>
		</tr>`;

		tableContents += tr;
	}
	table.getElementsByTagName("tbody")[0].innerHTML = tableContents;
}

function changeEmoji(index){
	console.log("Change Emoji: " + index);
	console.log("New Emoji: " + emojis[index]);
	document.getElementById("emoji").innerHTML = emojis[index];
	
	var url = "/api/user/update";

	var data = {};
	data.emoji = emojis[index];
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
		} else if(xhr.status == "400"){ 
		}
		else {
			console.error(users);
		}
	}
	xhr.send(json);
}


function friendView(page){
	let friends = document.getElementById("friendTable");
	let requests = document.getElementById("friendRequestTable");
	let search = document.getElementById("friendSearch");

	if(page === "friends"){
		friends.classList.remove("invisible");
		requests.classList.add("invisible");
		search.classList.add("invisible");
	}
	else if(page === "requests"){
		requests.classList.remove("invisible");
		friends.classList.add("invisible");
		search.classList.add("invisible");
	}
	else{
		search.classList.remove("invisible");
		requests.classList.add("invisible");
		friends.classList.add("invisible");
	}
}

function challengeView(page){
	let received = document.getElementById("requestTable");
	let sent = document.getElementById("sentTable");
	let accepted = document.getElementById("acceptedTable");
	if(page === "received"){
		received.classList.remove("invisible");
		sent.classList.add("invisible");
		accepted.classList.add("invisible");
	}
	else if(page === "sent"){
		sent.classList.remove("invisible");
		received.classList.add("invisible");
		accepted.classList.add("invisible");
	}
	else{
		accepted.classList.remove("invisible");
		received.classList.add("invisible");
		sent.classList.add("invisible");
	}
}

changeDisplayName = (changedisplayname, repeatdisplayname) => {
	if(verifychangeDisplayName(changedisplayname, repeatdisplayname)){
		console.log("displayname changed and verified.");
		changingDisplayName(changedisplayname, repeatdisplayname);
		return 1;
	}
	return 0;
}

function changingDisplayName(changedisplayname, repeatdisplayname){

	var url = "/api/user/update";

	var data = {};
	data.display_name = changedisplayname;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			document.getElementById("displayNameText").value = "";
			document.getElementById("repeatDisplayNameText").value = "";
			document.getElementById("GeneralDSError").innerHTML = " ";

		} else if(xhr.status == "400"){ 
			document.getElementById("GeneralDSError").innerHTML = "Please enter a NEW Display name";
		}
		else {
			console.error(users);
		}
	}
	xhr.send(json);
}

changePassword = (changepassword, repeatpassword) => {
	
	if(verifychangePassword(changepassword, repeatpassword)){
		console.log("password changed and verified.");
		changingPassword(changepassword, repeatpassword);
		return 1;
	}
	return 0;
}

function changingPassword(changepassword, repeatpassword){

	var url = "/api/user/update";

	var data = {};
	data.password = changepassword;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			document.getElementById("repeatPasswordText").value = "";
			document.getElementById("passwordText").value = "";
			document.getElementById("GeneralPasswordError").innerHTML = " ";

		} else if(xhr.status == "400"){ 
			document.getElementById("GeneralPasswordError").innerHTML = "Please enter a NEW Password";

			GeneralDSError
		}
		else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function verifychangeDisplayName(changedisplayname, repeatdisplayname){

	var has_error = false;
	//changedisplayname
	if(!changedisplayname){
		document.getElementById("displaynameError").innerHTML = "Please enter a new Display name";
		has_error = true;
	}
	else{
		document.getElementById("displaynameError").innerHTML = " ";
	}

	//repeatdisplayname
	if(!repeatdisplayname){
		document.getElementById("displaynameverifyError").innerHTML = "Please verify your new Display name";
		has_error = true;
	}
	else if(repeatdisplayname != changedisplayname){
		document.getElementById("displaynameverifyError").innerHTML = "Display name not verify";
		has_error = true;
	}
	else{
		document.getElementById("displaynameverifyError").innerHTML = " ";
	}

	if(has_error){
		return 0;
	}
	return 1;
}

function verifychangePassword(changepassword, repeatpassword){

	var has_error = false;
	//changepassword
	if(!changepassword){
		document.getElementById("passwordError").innerHTML = "Please enter a new password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = " ";
	}

	//repeatpassword
	if(!repeatpassword){
		document.getElementById("passwordverifyError").innerHTML = "Please verify your new password";
		has_error = true;
	}
	else if(repeatpassword != changepassword){
		document.getElementById("passwordverifyError").innerHTML = "Password not verify";
		has_error = true;
	}
	else{
		document.getElementById("passwordverifyError").innerHTML = " ";
	}

	if(has_error){
		return 0;
	}
	return 1;
}

