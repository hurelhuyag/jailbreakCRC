var jailbreakButton = document.getElementById("startJailbreakCRC"); 

jailbreakButton.addEventListener('click', function onkeyup(event) {
  self.port.emit('jailbreak-button-clicked');
  //console.log("panel.js click");
}, false);

self.port.on("jailbreak-enabled", function() {
  jailbreakButton.innerHTML = "CRC-н хяналтанд орох";
});

self.port.on("jailbreak-disabled", function() {
  jailbreakButton.innerHTML = "Эрх чөлөөг мэдрэх";
});

