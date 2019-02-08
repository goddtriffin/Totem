


function changeDisplayName(){
	var displayname = changeSettings.changedisplayname.value;
	var displaynameverify = changeSettings.repeatdisplayname.value;
	if(verifychangeDisplayName(displayname, displaynameverify)){
		// document.getElementById("changedisplayname").innerHTML = '';
		// document.getElementById("repeatDisplayNameText").innerHTML = '';
		console.log("displayname changed and verified.");
	}

}


function changePassword(){
	var password = changeSettings.changepassword.value;
	var passwordverify = changeSettings.repeatpassword.value;
	if(verifychangePassword(password, passwordverify)){
		// document.getElementById("passwordText").innerHTML = "";
		// document.getElementById("repeatPasswordText").innerHTML = "";
		console.log("password changed and verified.");
	}

}

function verifychangeDisplayName(displayname, displaynameverify){

	var has_error = false;
	//displayname
	if(!displayname){
		document.getElementById("displaynameError").innerHTML = "Please enter a new Display name";
		has_error = true;
	}
	else if(displayname.length < 5){
		document.getElementById("displaynameError").innerHTML = "Please enter a new valid Display name";
		has_error = true;
	}
	else{
		document.getElementById("displaynameError").innerHTML = "";
	}

	//displaynameverify
	if(!displaynameverify){
		document.getElementById("displaynameverifyError").innerHTML = "Please verify your new Display name";
		has_error = true;
	}
	else if(displaynameverify != displayname){
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

function verifychangePassword(password, passwordverify){

	var has_error = false;
	//password
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a new password";
		has_error = true;
	}
	else if(password.length < 8){
		document.getElementById("passwordError").innerHTML = "Please enter a new valid password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}

	//passwordverify
	if(!passwordverify){
		document.getElementById("passwordverifyError").innerHTML = "Please verify your new password";
		has_error = true;
	}
	else if(passwordverify != password){
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