


login = (username, password) => {
	if(verifyInput(username, password)){
		// move to next page
		console.log("move to next page");
		return 1;
	}
	else{
		return 0;
	}

}


function verifyInput(username, password){	
	var has_error = false;
	//username
	if(!username){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}

	//passwords
	if(!password){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}

	if(has_error){
		return 0;
	}
	return 1;
}

