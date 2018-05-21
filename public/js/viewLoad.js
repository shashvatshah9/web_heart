var page_request = new XMLHttpRequest()

function openPage(arg){
	var page_url = 'http://localhost:3000/views/' + arg
	var vid = document.getElementById('media');
	vid.pause();
	window.location.href=page_url
}