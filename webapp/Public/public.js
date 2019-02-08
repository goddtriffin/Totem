

createPoll = (title, theme, experiation, imageOne, imageTwo, privacy1, privacy2) =>{


	// console.log("title " + title);
	// console.log("theme " + theme);
	console.log("experiation " + experiation);
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getFullMonth()+1)+'-'+today.getFullDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+'T'+time;
	console.log(dateTime)
	// console.log("privacy" + privacy1);
	// console.log("privacy" + privacy2);
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