var ENABLED="enabled";
var DISABLED = "disabled";
var PAC_URL = "https://raw.githubusercontent.com/naranbat/jailbreakCRC/master/blacklist.pac";

//blacklist pac
var enableConfig = {
	mode: "pac_script",
	pacScript: {
		url: PAC_URL
	}
};

//default
var disableConfig = {
	mode: "direct"
};	 


//load current state
if (localStorage.currentState == undefined || localStorage.currentState == DISABLED) {
	localStorage.currentState = DISABLED;
	chrome.runtime.sendMessage({  "directive":"update-icon","newIconPath" :"disabled50.png" });
} else {
	localStorage.currentState = ENABLED;
	chrome.runtime.sendMessage({  "directive":"update-icon","newIconPath" :"enabled50.png" });
}


chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch (request.directive) {
			case "update-state":
				if (localStorage.currentState==ENABLED) {
					//disable
					localStorage.currentState = DISABLED;
					chrome.runtime.sendMessage({  "directive":"update-icon","newIconPath" :"disabled50.png" });
					chrome.proxy.settings.set({	value: disableConfig, 
												scope: 'regular'},
												function() {});
				} else {
					//enable
					localStorage.currentState = ENABLED;
					chrome.runtime.sendMessage({  "directive":"update-icon","newIconPath" :"enabled50.png" });
					//chrome.proxy.settings.pacScript.url = chrome.extension.getURL("blacklist.pac");
					chrome.proxy.settings.set({	value: enableConfig, 
												scope: 'regular'},
												function() {});
				}
				break;
			case "update-icon":
				chrome.browserAction.setIcon({
					path: request.newIconPath
				});
				break;
			default:
				alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
		}
	}
);
