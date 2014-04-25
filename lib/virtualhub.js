var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var conf = require('../conf.js');
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

module.exports = function(){
  this.actuators = [];
  this.sensors = [];
  this.things = [];
}

module.exports.prototype.initYoctoArrays = function ( ) {
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

module.exports.prototype.init = function () {
  // Initializes the module with sensors and actuators lists

  try
  {
    YAPI.RegisterHub(conf.virtualHub.ip) // The RegisterHub function does not take the port into account, that's why we don't use it
    console.log("VirtualHub registered at " + conf.virtualHub.ip + ":" + conf.virtualHub.port);

  }
  catch (err){

    console.log("VirtualHub failed to register at " + conf.virtualHub.ip + ":" + conf.virtualHub.port);
    console.log(err.name);
    console.log(err.description);
    return;

  }

  this.initYoctoArrays();

};

module.exports.prototype.listen = function() {
  var self = this;
  setInterval(function(){
    YAPI.UpdateDeviceList_async(function(){
      self.initYoctoArrays();
    });
  }
    ,conf.virtualHub.updateTime);
};
