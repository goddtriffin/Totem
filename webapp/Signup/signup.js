
	

function CreateUser() {
	var username = signupform.username.value;
	var displayName =  signupform.displayName.value;
	var email = signupform.email.value;
	var password = signupform.password.value;
	var passwordVerify = signupform.passwordVerify.value;
	verifyInput(username, displayName, email, passwordVerify, password);


}




function verifyInput(username, displayName, email, passwordVerify, password){
	
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
	}
	else if(username.length < 6){
		document.getElementById("usernameError").innerHTML = "Please enter a valid Username";
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	//display name
	if(!displayName){
		document.getElementById("displayNameError").innerHTML = "Please enter a Display Name";
	}
	else if(displayName.length < 5){
		document.getElementById("displayNameError").innerHTML = "Please enter a valid Display Name";
	}
	else{
		document.getElementById("displayNameError").innerHTML = "";
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

	//passwords
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
	}
	else if(password.length < 8){
		document.getElementById("passwordError").innerHTML = "Please enter a valid password";
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}
	if(!passwordVerify){
		document.getElementById("passwordVerifyError").innerHTML = "Please verify your password";
	}
	else if (password != passwordVerify){
		document.getElementById("passwordVerifyError").innerHTML = "Password was not verified, Please try again";
	}
	else{
		document.getElementById("passwordVerifyError").innerHTML = "";

	}


}

