function getHistory(){
	var url  = "/api/user/history";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);

			let history = users.data;
			// let runningTable = ``;
			// let tableBody = document.getElementById("friendTableBody");
			for(let i = 0; i < history.length; i++){
				console.log(history[i].poll)
				let id = history[i].poll
				const xhr1  = new XMLHttpRequest();
				xhr1.open('GET', '/api/poll/' + id);
				xhr1.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

				xhr1.onload = function () {
					const response = JSON.parse(xhr1.responseText);
					if (xhr1.readyState == 4 && xhr1.status == "200") {

						let username_creator = response.data.creator
						let username_opponent = response.data.opponent
						// fix after asych issue in public is fixed
						// let display_name_creator = 
						// let display_name_opponent = 
						let title = response.data.display_name
						let theme = response.data.theme
						var total = response.data.votes_1 + response.data.votes_2;
			 			let leftPercentage = response.data.votes_1 / total;
			 			let rightPercentage = response.data.votes_2/ total;
						
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
                                                        ${image1}
                                                    </div>
                                                    <div class="col-6" id="cardRight">
                                                        <!-- Contents -->
                                                        ${image2}
                                                    </div>
                                                </div>
                            
                                                <!-- Results overlay -->
                                                <div class="row col-md-12" id="cardContentOverlay">
                                                    <div class="col-6" id="cardLeftOverlay">
                                                        <div id="leftBlank"></div>
                                                        <div id="leftResults">
                                                            <p class="resultText">50%</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-6" id="cardRightOverlay">
                                                        <div id="rightBlank"></div>
                                                        <div id="rightResults">
                                                            <p class="resultText">75%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="row col-md-12" id="cardBottom">
                                                    <div class="col-6" id="leftUser">
                                                        <p id="leftDisplayName" class="displayName">${displayname}</p>
                                                        <p id="leftUsername">${username}</p>
                                                    </div>
                                                    <div class="col-6" id="rightUser">
                                                        <p id="rightDisplayName" class="displayName">${displayname}</p>
                                                        <p id="rightUsername">${username}</p>
                                                    </div>
                                                </div>
                                            </div>`












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



	// friends = users.data;
	// 		console
	// 		//Populate HTML
	// 		let runningTable = ``;
	// 		let tableBody = document.getElementById("friendTableBody");
	// 		for(let i = 0; i < users.data.length; i++){
	// 			friend_username.push(users.data[i].username)
	// 			runningTable += `
	// 				<tr>
	// 					<td>${users.data[i].emoji}</td>
	// 					<th scope="row">${users.data[i].username}</th>  
	// 					<td>${users.data[i].display_name}</td>
	// 					<td>${users.data[i].tiki_tally}</td>
	// 				</tr>`;
	// 		}
	// 		tableBody.innerHTML = runningTable;

