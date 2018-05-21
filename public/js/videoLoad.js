var requestURL = 'http://localhost:3000/json';
var request = new XMLHttpRequest();
var video_list, videos, i, len;
var cod="";

request.open('GET', requestURL);
request.send();

request.onload = function() {
		video_list = request.responseText;
		videos = JSON.parse(video_list);
		len = Object.keys(videos).length;
	var s1='<div><button class="playlist_button" onclick=\'changeSource("';
	var s2='")\' title="';
	var s3='">';
	var s4="</button></div>";
	for(i = 0 ; i < len; i++){
		var name = videos[i].name.split('.')
		//console.log(videos[i].name)
		cod+=s1+videos[i].name+s2+name[0]+s3+name[0]+s4;
	}
	//console.log(cod)
	document.getElementById('playlist').innerHTML += cod;	
}

function changeSource(arg){
		console.log("changing the source "+arg);
		var vid = document.getElementById('media');
		vid.pause();
		vid.src = 'http://localhost:3000/video/'+arg;
		vid.load();
		vid.play();
}

