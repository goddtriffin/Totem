window.onload = function() {
    load();
};

function load() {
    const id = sessionStorage.getItem('pollId');

	const xhr  = new XMLHttpRequest();
	xhr.open('GET', '/api/poll/' + id);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    
	xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
            // handle success
            console.log(response);

            document.getElementById('image1').src = response.data.image_1;
            document.getElementById('image2').src = response.data.image_2;
		} else {
            // handle error
            console.log(response);
		}
    }
    
	xhr.send(null);
}
