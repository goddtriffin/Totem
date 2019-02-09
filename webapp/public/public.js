

createPoll = (title, theme, experiation, imageOne, imageTwo, privacy1, privacy2) =>{

	if(privacy1 == "on"){

		console.log("private");
	}
	else{
		console.log("public");

	}
}


function verifyCreatepollInput(title, theme, experiation, imageOne, imageTwo, privacy){

	var has_error = false;

	if(has_error){
		return 0;
	}
	return 1;
}

function switchPollType(){
	var ele = document.querySelectorAll(".btn-group > button.btn");
	for(var i=0; i<ele.length; i++){
		if(ele[i].checked){
			console.log(ele[i].value);
		}
	}
	if(document.getElementById("personalButton").checked === true){
		console.log("Personal Selected");
	}	
	else{
		console.log("Challenge Selected");
	}
}