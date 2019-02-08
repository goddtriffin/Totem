
changeDisplayName = (changedisplayname, repeatdisplayname) => {
	if(verifychangeDisplayName(changedisplayname, repeatdisplayname)){
		console.log("displayname changed and verified.");
		return 1;
	}
	return 0;
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