

signup = (username, displayName, email, password, passwordVerify) => {
	
	if(verifyInput(username, displayName, email, passwordVerify, password)){
		// move to next page
		console.log("move to next page");

		Createuser(username, displayName, email, password, passwordVerify);
		


		return 1;
	}
	return 0;
}

function Createuser(username, displayName, email, password, passwordVerify){


	var url = "http://localhost:3000/api/user/signup";

	var data = {};
	data.email= email;
	data.username = username;
	data.display_name = displayName;
	data.password = password;
	data.emoji = "apple";

	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			document.getElementById("GeneralError").innerHTML = "";
			window.location.href = '../login';

		} 
		else if(xhr.status == "409"){
			document.getElementById("GeneralError").innerHTML = "Please use DIFF info!";

		}

			else {
			console.error(users);
		}
	}
	
	xhr.send(json);

}



function verifyInput(username, displayName, email, passwordVerify, password){
	
	var has_error = false;

	//username
	if(username== ""){
		document.getElementById("usernameError").innerHTML = "Please enter a Username";
		has_error = true;
	}
	else{
		document.getElementById("usernameError").innerHTML = "";
	}
	
	//display name
	if(displayName== ""){
		document.getElementById("displayNameError").innerHTML = "Please enter a Display Name";
		has_error = true;
	}
	else{
		document.getElementById("displayNameError").innerHTML = "";
	}

	// email
	if(email== ""){
		document.getElementById("emailError").innerHTML = "Please enter your Email";
		has_error = true;	
	}
	else{
		document.getElementById("emailError").innerHTML = "";
	}

	//passwords
	if(password == ""){
		document.getElementById("passwordError").innerHTML = "Please enter a password";
		has_error = true;
	}
	else{
		document.getElementById("passwordError").innerHTML = "";
	}
	if(passwordVerify== ""){
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

