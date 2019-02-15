
changeDisplayName = (changedisplayname, repeatdisplayname) => {
	// if(verifychangeDisplayName(changedisplayname, repeatdisplayname)){
		console.log("displayname changed and verified.");
		changingDisplayName(changedisplayname, repeatdisplayname);
		return 1;
	// }
	// return 0;
}
function changingDisplayName(changedisplayname, repeatdisplayname){

/*
var url = "http://localhost:3000/api/user/update";
var url1 = "http://localhost:3000/";

	

	var xhr = new XMLHttpRequest();

	xhr.open('GET', url, true)

	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.open("PUT", url, true);
	var data = {};
	data.displayname = changedisplayname;

	var json = JSON.stringify(data);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users.data);
			// document.getElementById("GeneralError").innerHTML = "";

			// window.location.href = '../profile';
		} 
		else if(xhr.status == "400"){
			// document.getElementById("GeneralError").innerHTML = "Please correct info!";

		}
			else {
			console.error(users);
		}
	}
	
	xhr.send(json);
*/


}


changePassword = (changepassword, repeatpassword) => {
	
	if(verifychangePassword(changepassword, repeatpassword)){
		console.log("password changed and verified.");
		return 1;
	}
	return 0;
}

function verifychangeDisplayName(changedisplayname, repeatdisplayname){

	var has_error = false;
	//changedisplayname
	if(!changedisplayname){
		document.getElementById("displaynameError").innerHTML = "Please enter a new Display name";
		has_error = true;
	}
	else if(changedisplayname.length < 5){
		document.getElementById("displaynameError").innerHTML = "Please enter a new valid Display name";
		has_error = true;
	}
	else{
		document.getElementById("displaynameError").innerHTML = "";
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
		document.getElementById("displaynameverifyError").innerHTML = "";
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
	else if(changepassword.length < 8){
		document.getElementById("passwordError").innerHTML = "Please enter a new valid password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
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
		document.getElementById("passwordverifyError").innerHTML = "";
	}

	if(has_error){
		return 0;
	}
	return 1;

}