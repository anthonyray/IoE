var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var conf = require('../conf.js');
var sensorHelper = require('./sensorhelper');
// Initialize sensors types

var YModule = yoctolib.YModule; // Generic

// Customize according to your sensors.
var YTemperature = yoctolib.YTemperature;
var YLightSensor = yoctolib.YLightSensor;
var YHumidity = yoctolib.YHumidity;
var YPressure = yoctolib.YPressure;

// Customize according to your actuators

var YColorLed = yoctolib.YColorLed;
var YDisplay = yoctolib.YDisplay;

// Adding a common setValue for actuators

yoctolib.YDisplay.prototype.setValue = function(value,cb) { // Custom setValue for a display
  
  var displayLayer = this.get_displayLayer(0); // Retrieve the first layer of the display
  
  var displayWidth = displayLayer.get_displayWidth(); // Retrieve the display's width
  var displayHeight = displayLayer.get_displayHeight(); // Retrieve the  the display's height

  this.resetAll(); // Resets all the layers from the display 
  displayLayer.clear(); // Clear the current layer
  displayLayer.drawText(displayWidth/2 , displayHeight/2+3,yoctolib.YDisplayLayer.ALIGN_CENTER,value); // Draw the text passed as an argument and centers it in the screen
  
  this._currentValue = value;
  return cb && cb();

};

yoctolib.YColorLed.prototype.setValue = function(value,cb) {
  
  var newColor;
  
  switch (value){
    case "BLUE":
      newColor = sensorHelper.RGBtoInt(0,0,255);
      break;
    case "GREEN":
      newColor = sensorHelper.RGBtoInt(0,255,0);
      break;
    case "RED":
      newColor = sensorHelper.RGBtoInt(255,0,0);
      break;
    case "ORANGE":
      newColor = sensorHelper.RGBtoInt(255,140,0);
      break;
    default: 
      newColor = sensorHelper.RGBtoInt(0,0,0); // Turns the led off
  }

  this.set_rgbColor(newColor);
  this._currentValue = value;
  return cb && cb();

};

// Adding a common getValue for actuators

yoctolib.YDisplay.prototype.getValue = function() { // Custom getValue for a display
  return this._currentValue;
};

yoctolib.YColorLed.prototype.getValue = function() {
  return this._currentValue;
};

/*
* Definition of the module
*/

module.exports = function(){
  this.actuators = [];
  this.sensors = [];
  this.things = [];
  
}

module.exports.prototype.initYoctoArrays = function () {
  // Clear arrays properly
  while (this.things.length > 0){
    this.things.pop();
  }

  while (this.actuators.length > 0){
    this.actuators.pop();
  }

  while (this.sensors.length > 0){
    this.sensors.pop();
  }

  // Populate things, actuators, and sensors arrays
  var module = YTemperature.FirstTemperature();
  while (module) {
    this.things.push(module);
    this.sensors.push(module);
    module = module.nextTemperature();
  }

  module = YLightSensor.FirstLightSensor();
  while (module) {
    this.things.push(module);
    this.sensors.push(module);
    module = module.nextLightSensor();
  }

  module = YHumidity.FirstHumidity();
  while (module) {
    this.things.push(module);
    this.sensors.push(module);
    module = module.nextHumidity();
  }

  module = YPressure.FirstPressure();
  while (module) {
    this.things.push(module);
    this.sensors.push(module);
    module = module.nextPressure();
  }

  module = YColorLed.FirstColorLed();
  while (module) {
    this.things.push(module);
    this.actuators.push(module);
    module = module.nextColorLed();
  }

  module = YDisplay.FirstDisplay();
  while (module) {
    this.things.push(module);
    this.actuators.push(module);
    module = module.nextDisplay();
  }
};

module.exports.prototype.init = function (cb) {
  // Initializes the module with sensors and actuators lists

  try
  {
    YAPI.RegisterHub(conf.virtualHub.ip) // The RegisterHub function does not take the port into account, that's why we don't use it
    console.log("[Virtualhub] VirtualHub registered at " + conf.virtualHub.ip + ":" + conf.virtualHub.port);

  }
  catch (err){

    console.log("[Virtualhub] VirtualHub failed to register at " + conf.virtualHub.ip + ":" + conf.virtualHub.port);
    console.log(err.name);
    console.log(err.description);
    return;

  }

  this.initYoctoArrays();
  cb();

};

module.exports.prototype.listen = function() { // Listens for plugged or unplugged devices.
  var self = this;
  setInterval(function(){
    YAPI.UpdateDeviceList_async(function(){
      self.initYoctoArrays();
    });
  }
    ,conf.virtualHub.updateTime);
};
