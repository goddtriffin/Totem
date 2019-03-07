function getMyPolls(){
	var url  = "/api/user/me/polls";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);

			let history = users.data;
			let runningTable = ``;
			let tableBody = document.getElementById("viewMyPolls");
			for(let i = 0; i < history.length; i++){
				console.log(history[i].id)
				let id = history[i].id
				const xhr1  = new XMLHttpRequest();
				xhr1.open('GET', '/api/poll/' + id);
				xhr1.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

				xhr1.onload = function () {
					const response = JSON.parse(xhr1.responseText);
					if (xhr1.readyState == 4 && xhr1.status == "200") {
						console.log("id: "+ response.data.id)
						console.log("voted: "+response.data.voted)
						console.log("POLL: " + response.data)
						let username_creator = response.data.creator;
						let username_opponent = response.data.opponent;
						// fix after asych issue in public is fixed
						// let display_name_creator = 
						// let display_name_opponent = 
						let title = response.data.display_name;
						let theme = response.data.theme;
						let type = response.data.type;
						let voted = response.data.voted;
						let leftBackground = "rgba(255, 255, 255, 0.5)";
						let rightBackground = "rgba(255, 255, 255, 0.5)";
						if(voted === 1){
							leftBackground = "rgba(255,255,255, 0.8)";
						}
						else if(voted === 2){
							rightBackground = "rgba(255,255,255, 0.8)";
						}
						if(response.data.hasOwnProperty('voted')){
							document.getElementById("cardContentOverlay").classList.remove("invisible");
							// document.getElementById("leftImg").classList.add("opacity");
							// document.getElementById("rightImg").classList.add("opacity");
						}
						else{
							console.log("removing graph")
							document.getElementById("cardContentOverlay").classList.add("invisible");
							document.getElementById("cardLeftOverlay").classList.add("invisible");
							document.getElementById("cardRightOverlay").classList.add("invisible");
							// document.getElementById("leftImg").classList.remove("opacity");
							// document.getElementById("rightImg").classList.remove("opacity");
							
							
						}

						var total = response.data.votes_1 + response.data.votes_2;
			 			let leftPercentage = (response.data.votes_1 / total) * 100.0;
						let rightPercentage = (response.data.votes_2/ total) * 100.0;
						let leftBlank = 100 - leftPercentage;
						let rightBlank = 100 - rightPercentage;
						console.log("LEFT: " + leftPercentage + " RIGHT: " + rightPercentage);

			 			var img1 = new Image();
						img1.src = response.data.image_1
						  
						var img2 = new Image();
						img2.src = response.data.image_2
			 			
			 			let image1 = img1.src
			 			let image2 = img2.src
			 			let displayname = "hello"

						let username = "goodbye"						
						console.log(response);
						//todo cameron
						runningTable += 
				            			`<div class="col-sm-5 pollCard">
                                                <div id="cardTitle" class="col-md-12">
                                                    <p id="titleP">${title}</p>
                                                    <div class="col-md-12" id="themes">
                                                        <p>${theme}</p>
                                                    </div>
                                                </div>
                                                <div class="row col-md-12" id="cardContent">
                                                    <div class="col-6" id="cardLeft">
                                                        <!-- Contents -->
                                                        <img id="leftImg" src="${image1}" class="pollImage" width="100%">
                                                    </div>
                                                    <div class="col-6" id="cardRight">
                                                        <!-- Contents -->
                                                        <img id="rightImg" src="${image2}" class="pollImage" width="100%">
                                                    </div>
                                                </div>
                            
                                                <!-- Results overlay -->
                                                <div class="row col-md-12" id="cardContentOverlay">
                                                    <div class="col-6" id="cardLeftOverlay" >
                                                        <div id="leftBlank" style="height:${leftBlank}%;"></div>
                                                        <div id="leftResults" style="height:${leftPercentage}%; background:${leftBackground}">
                                                            <p class="resultText">${leftPercentage}%</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-6" id="cardRightOverlay">
                                                        <div id="rightBlank" style="height:${rightBlank}%;"></div>
                                                        <div id="rightResults" style="height:${rightPercentage}%; background:${rightBackground}">
                                                            <p class="resultText">${rightPercentage}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="row col-md-12 justify-content-md-center" id="cardBottom">
                                                    <div class="col-6" id="leftUser">
                                                        <p id="leftDisplayName" class="displayName">${displayname}</p>
                                                        <p id="leftUsername">${username_creator}</p>
                                                    </div>
                                                    <div class="col-6 ${type}" id="rightUser">
                                                        <p id="rightDisplayName" class="displayName">${displayname}</p>
                                                        <p id="rightUsername">${username_opponent}</p>
                                                    </div>
                                                </div>
                                            </div>`

						tableBody.innerHTML = runningTable;


					} else {
				            // handle error
				            console.log(response);
					}
				}
				    
				xhr1.send(null);
			}
			

			tableBody.innerHTML = runningTable;


		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}
