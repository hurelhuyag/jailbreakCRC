var ENABLED="enabled";
var DISABLED = "disabled";


function load(){
	if (localStorage.currentState==ENABLED) {
		//disabled
		document.getElementById('startJailbreakCRC').innerHTML = "CRC-н хяналтанд орох"; 
	} else {
		//enabled
		document.getElementById('startJailbreakCRC').innerHTML = "Эрх чөлөөг мэдрэх";
	}
}

function clickHandler(e) {
	chrome.extension.sendMessage({directive: "update-state"}, function(response) {
		this.close(); // close the popup when the background finishes processing request
	});

	if (localStorage.currentState==DISABLED) {
		//disabled
		document.getElementById('startJailbreakCRC').innerHTML = "CRC-н хяналтанд орох"; 
	} else {
		//enabled
		document.getElementById('startJailbreakCRC').innerHTML = "Эрх чөлөөг мэдрэх";
	}
}

document.addEventListener('DOMContentLoaded', function () {
	load();
	document.getElementById('startJailbreakCRC').addEventListener('click', clickHandler);
});
