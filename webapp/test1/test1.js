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
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            sessionStorage.setItem('pollId', response.data);
            window.location.href = '/test2';
		} else {
            // handle error
            console.log(response);
		}
	}

    xhr.send(new FormData(document.getElementById('form')));
}
