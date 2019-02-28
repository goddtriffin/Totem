window.onload = function() {
	if (localStorage.getItem("token") === null) {
  		window.location.replace("/splash");
	}
	else{
	
	}

};



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