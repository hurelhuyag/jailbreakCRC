var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var panels = require("sdk/panel");
var self = require("sdk/self");
var prefsvc = require("sdk/preferences/service");
var simplestorage = require("sdk/simple-storage");


var disabledIcons = {
    "16": "./disabled16.png",
    "32": "./disabled32.png"
  };

var enabledIcons = {
    "16": "./enabled16.png",
    "32": "./enabled32.png"
};

var ENABLED="enabled";
var DISABLED = "disabled";
var PAC_URL = "https://raw.githubusercontent.com/naranbat/jailbreakCRC/master/blacklist.pac";

function jailbreakCRC(state) {
  if (state) {
    prefsvc.set("network.proxy.type", 2);
    //prefsvc.set("network.proxy.autoconfig_url", "data:text/javascript," + encodeURIComponent(self.data.load('blacklist.pac')));
    prefsvc.set("network.proxy.autoconfig_url", PAC_URL);

    button.icon = enabledIcons;
    panel.port.emit('jailbreak-enabled');
  } else {
    prefsvc.set("network.proxy.type", 5); //use system proxy
    //prefsvc.set("network.proxy.type", 0); // direct connection, no proxy
    prefsvc.set("network.proxy.autoconfig_url", "");

    button.icon = disabledIcons;
    panel.port.emit('jailbreak-disabled');
  }
}


exports.main = function (options, callbacks) {
  //if (options.loadReason === 'install' || options.loadReason === 'enable') {
    if (simplestorage.storage.currentState == ENABLED ) {
      //enabled
      //console.log("previous state is disabled");
      jailbreakCRC(true);
    } else {
      //disabled
      //console.log("previous state is enabled");
      jailbreakCRC(false);
    }
  //}
}

exports.onUnload = function (reason) {
  if (reason == 'disable' || reason == 'uninstall'){
    jailbreakCRC(false);
  }
}

var button = buttons.ActionButton({
  id: "toolbarButton",
  label: "Jailbreak CRC",
  icon: disabledIcons,
  onClick: handleClick
});

function handleClick(state) {
  panel.show({
    position: button
  });
}

var panel = panels.Panel({
  width:390,
  height:620,
  contentURL: self.data.url("popup.html"),
  contentScriptFile: self.data.url("panel_content.js"),
  contentScriptWhen: 'ready',
  onShow: handleShow,
  onHide: handleHide
});

function handleHide() {
  //console.log("hide");
}

function handleShow(){
  //console.log("show");
  if (simplestorage.storage.currentState == ENABLED ) {
    panel.port.emit('jailbreak-enabled');  
  } else {
    panel.port.emit('jailbreak-disabled');
  }
}

panel.port.on("jailbreak-button-clicked", function() {
  if (simplestorage.storage.currentState == ENABLED ){
    //to disable
    //console.log("to disable");
    simplestorage.storage.currentState  = DISABLED;
    jailbreakCRC(false);
  } else {
    //to enable
    //console.log("to enable");
    simplestorage.storage.currentState  = ENABLED;
    jailbreakCRC(true);
  }
});

