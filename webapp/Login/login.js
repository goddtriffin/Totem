

function login(){
	var username = loginform.username.value;
	var password = loginform.password.value;
	verifyInput(username, password);
}


function verifyInput(username, password){	
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
	}
	
	else{
		document.getElementById("usernameError").innerHTML = "";
	}

	//passwords
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}
}

