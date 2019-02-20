let emojis = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛"];



window.onload = function() {
	console.log("onload worked");
  fillUserInfo();

  //Populate Emoji table
  loadEmojis();

};


function fillUserInfo(){
	var url  = "/api/user/me";
	var xhr  = new XMLHttpRequest()

	xhr.open('GET', url, true)
	xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.token);

	xhr.onload = function () {
		console.log(xhr.responseText);
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.log(users);
			document.getElementById("displayName").innerHTML = users.data.display_name;
			document.getElementById("username").innerHTML = users.data.username;
			
			//TODO: @CameronGlass 
			// fix the positioning of the emoji at the top of the pagew
			document.getElementById("emoji").innerHTML = users.data.emoji;
			
			//Move data to HTML --> you need to create the place and give it the ids listed below. These will 
			//return the numbers automatically when the page is loaded. 
			
			document.getElementById("WinRate").innerHTML = `Win Rate<br>`+ users.data.friend_challenges_won/users.data.friend_challenges;
			document.getElementById("TikiTally").innerHTML = `Tiki Tally<br>`+ users.data.tiki_tally;
			document.getElementById("PollsCreated").innerHTML = `Polls Created<br>`+ users.data.polls_created;

		} else {
			console.error(users);
		}
	}	
	xhr.send(null);
}


function logout(){
	console.log("logout");
	localStorage.removeItem(localStorage.token);
	window.location.href = "/splash";

}

function loadEmojis(){
	let table = document.getElementById("emojiTable");
	let tableContents = "";
	for(let i = 0; i < emojis.length; i += 5){
		let tr = `<tr>
			<td class="emoji" onclick="changeEmoji(${i})" data-dismiss="modal">${emojis[i]}</td>
			<td class="emoji" onclick="changeEmoji(${i+1})" data-dismiss="modal">${emojis[i+1]}</td>
			<td class="emoji" onclick="changeEmoji(${i+2})" data-dismiss="modal">${emojis[i+2]}</td>
			<td class="emoji" onclick="changeEmoji(${i+3})" data-dismiss="modal">${emojis[i+3]}</td>
			<td class="emoji" onclick="changeEmoji(${i+4})" data-dismiss="modal">${emojis[i+4]}</td>
		</tr>`;

		tableContents += tr;
	}
	table.getElementsByTagName("tbody")[0].innerHTML = tableContents;

}

function changeEmoji(index){
	console.log("Change Emoji: " + index);
	console.log("New Emoji: " + emojis[index]);
	document.getElementById("emoji").innerHTML = emojis[index];
}

function friendView(page){
	let friends = document.getElementById("friendTable");
	let requests = document.getElementById("friendRequestTable");
	let search = document.getElementById("friendSearch");

	if(page === "friends"){
		friends.classList.remove("invisible");
		requests.classList.add("invisible");
		search.classList.add("invisible");
	}
	else if(page === "requests"){
		requests.classList.remove("invisible");
		friends.classList.add("invisible");
		search.classList.add("invisible");
	}
	else{
		search.classList.remove("invisible");
		requests.classList.add("invisible");
		friends.classList.add("invisible");
	}
}

function challengeView(page){
	let received = document.getElementById("requestTable");
	let sent = document.getElementById("sentTable");
	if(page === "received"){
		received.classList.remove("invisible");
		sent.classList.add("invisible");
	}
	else{
		sent.classList.remove("invisible");
		received.classList.add("invisible");
	}
}
