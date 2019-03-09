let emojis = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛"];

window.onload = function() {
	if (localStorage.getItem("token") === null) {	
        //Populate Emoji table
        loadEmojis();
        localStorage.emoji = emojis[2];	
	}
	else{
	  	window.location.replace("/public");
	}
};

signup = (username, displayName, email, password, passwordVerify) => {
	if(verifyInput(username, displayName, email, passwordVerify, password)){
		// move to next page
		// console.log("move to next page");
		Createuser(username, displayName, email, password, passwordVerify);
		
		return 1;
	}
	return 0;
}

function Createuser(username, displayName, email, password, passwordVerify, emoji){
	var url = "/api/user/signup";

	var data = {};
	data.email= email;
	data.username = username;
	data.display_name = displayName;
	data.password = password;
	data.emoji = localStorage.emoji;

	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			// console.log(users);
			document.getElementById("GeneralError").innerHTML = "";
			window.location.href = '/login';
			localStorage.removeItem(localStorage.emoji);

		} 
		/*else if(xhr.status == "409"){
			
			document.getElementById("GeneralError").innerHTML = users.data;
		}*/

		else {
			if(users.data.indexOf("username") > -1) {
				document.getElementById("usernameError").innerHTML = users.data;
			}
			else if(users.data.indexOf("display_name") > -1) {
				document.getElementById("displayNameError").innerHTML = users.data;
			}
			else if(users.data.indexOf("password") > -1) {
				document.getElementById("passwordError").innerHTML = users.data;
			}
			else if(users.data.indexOf("email") > -1) {
				document.getElementById("emailError").innerHTML = users.data;
			}
			else {
				document.getElementById("GeneralError").innerHTML = users.data;
			}
			console.error(users);
		}
	}
	
	xhr.send(json);
}

function verifyInput(username, displayName, email, passwordVerify, password){
	var has_error = false;

	//username
	if(username== ""){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	//display name
	if(displayName== ""){
		document.getElementById("displayNameError").innerHTML = "Please enter a Display Name";
		has_error = true;
	}
	else{
		document.getElementById("displayNameError").innerHTML = "";
	}

	// email
	if(email== ""){
		document.getElementById("emailError").innerHTML = "Please enter your Email";
		has_error = true;	
	}
	else{
		document.getElementById("emailError").innerHTML = "";
	}

	//passwords
	if(password == ""){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}
	if(passwordVerify== ""){
		document.getElementById("passwordVerifyError").innerHTML = "Please verify your password";
		has_error = true;
	}
	else if (password != passwordVerify){
		document.getElementById("passwordVerifyError").innerHTML = "Password was not verified, Please try again";
		has_error = true;
	}
	else{
		document.getElementById("passwordVerifyError").innerHTML = "";
	}

	if(has_error){
		return 0;
	}
	return 1;
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
	// console.log("Change Emoji: " + index);
	// console.log("New Emoji: " + emojis[index]);
	document.getElementById("emoji").innerHTML = emojis[index];
	localStorage.emoji = emojis[index]
}
