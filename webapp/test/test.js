document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    createPersonalPoll();
});

function createPersonalPoll() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/poll/personal');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);

    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            console.log('success');
		} else {
            // handle error
            console.log('error');
		}
	}

    xhr.send(new FormData(document.getElementById('form')));
}
