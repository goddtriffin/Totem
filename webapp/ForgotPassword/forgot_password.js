
	

function forgotPassword() {
	// clearErrors();
	var username = forgotpasswordform.username.value;
	var email = forgotpasswordform.email.value;
	verifyInput(username, email);


}




function verifyInput(username, email){	
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
	}
	
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	// email
	var regexpEmail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+');
	if(!email){
		document.getElementById("emailError").innerHTML = "Please enter your Email";	
	}
	else if(!email.match(regexpEmail)){
		document.getElementById("emailError").innerHTML = "Please enter a valid Email";
	}
	else{
		document.getElementById("emailError").innerHTML = "";
	}
}

