
forgotPassword = (username, email) => {
	
	if(verifyInput(username, email)) {
		// move to login page
		return 1;
	}
	return 0;

}


function verifyInput(username, email){	
	var has_error = false;
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	// email
	var regexpEmail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+');
	if(!email){
		document.getElementById("emailError").innerHTML = "Please enter your Email";	
		has_error = true;
	}
	else if(!email.match(regexpEmail)){
		document.getElementById("emailError").innerHTML = "Please enter a valid Email";
		has_error = true;
	}
	else{
		document.getElementById("emailError").innerHTML = "";
	}

	if(has_error){
		return 0;
	}
	return 1;
}

