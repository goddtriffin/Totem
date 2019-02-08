

function CreateUser(username, displayName, email, password, passwordVerify) {
	// var username = signupform.username.value;
	// var displayName =  signupform.displayName.value;
	// var email = signupform.email.value;
	// var password = signupform.password.value;
	// var passwordVerify = signupform.passwordVerify.value;
	if(verifyInput(username, displayName, email, passwordVerify, password)){
		// move to next page
		console.log("move to next page");
	}
}


function verifyInput(username, displayName, email, passwordVerify, password){
	
	var has_error = false;

	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else if(username.length < 6){
		document.getElementById("usernameError").innerHTML = "Please enter a valid Username";
		has_error = true;

	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	//display name
	if(!displayName){
		document.getElementById("displayNameError").innerHTML = "Please enter a Display Name";
		has_error = true;
	}
	else if(displayName.length < 5){
		document.getElementById("displayNameError").innerHTML = "Please enter a valid Display Name";
		has_error = true;
	}
	else{
		document.getElementById("displayNameError").innerHTML = "";
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

	//passwords
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
		has_error = true;
	}
	else if(password.length < 8){
		document.getElementById("passwordError").innerHTML = "Please enter a valid password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}
	if(!passwordVerify){
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

