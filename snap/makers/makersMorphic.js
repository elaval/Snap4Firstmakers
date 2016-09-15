/*
    Changes to WorldMorph for managing global Makers functions
*/

/**
 * Global object (world.arduino) used for s4a/arduino properties
 */
WorldMorph.prototype.makers = {
};

/**
 * Functions for trasnforming analog values [0,1023] into measures
 */

WorldMorph.prototype.makers.convertAnalogMeasure = {
    // Temperature sensor LW35
    // Each 10 mV is 1 degree celsius
    'temperatureLW35' : function(val) {
        var millivolts = val*5000.0/1023.0,
            celsius = millivolts/29;

        if (world.isMakersV1) {
            celsius = millivolts/10;
        } 

        // return rouded to 1 decimal
        return Math.round(10*celsius)/10;
    },

    // Potentiometer - gives (0 to 5 volts)
    'potentiometer' : function(val) {
        var maxVal = 1023*20000.0/20000;
        var percentage = 100.0*(val)/maxVal;

        // For compatibility with version 1.0 of the board (inverser potentiometer readings)
        if (world.isMakersV1) {
            percentage = 100.0*(maxVal-val)/maxVal;
        }
        
        percentage = percentage < 0 ? 0 : percentage;
        percentage = percentage > 100 ? 100 : percentage;

        // return rounded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Temporarily is a linear relation volts to percentage
    // Needs to be adjusted with a proper curve
    'light' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Temporarily is a linear relation volts to percentage
    // Needs to be adjusted with a proper curve
    'audio' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Linear relation volts to percentage
    'humidity' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Normal statr is val > 900
    // When signal is detected, goes below 100
    'infrared' : function(val) {

        return val < 100;
    },

}

/*
    Changes to WorldMorph for managing Snap4Arduino functions
*/

/**
 * Global object (world.Arduino) used for s4a/arduino properties
 */
WorldMorph.prototype.Arduino = {
    firmata : require('firmata'),
     serialPort : require('serialport'),
    portList : [],
    usedPorts : []
};

/**
 * Locks the given port to prevent its use in other connections (until it is unlocked)
 */
WorldMorph.prototype.Arduino.lockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) === -1) {
        usedPorts.push(port);
    }
};

/**
 * Unlocks a previously Locked port to permit its use in new connections
 * Should be called when closing connections
 */
WorldMorph.prototype.Arduino.unlockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) > -1) {
        usedPorts.splice(usedPorts.indexOf(port));
    }
};

/**
 * Informs whether the port is locked or unlocked
 */
WorldMorph.prototype.Arduino.isPortLocked = function (port) {
    return (this.usedPorts.indexOf(port) > -1);
};

/**
 * 
 */
WorldMorph.prototype.Arduino.isFMKDevice = function (port) {
    if(port.productId == 67 && port.vendorId == 9025)
        return true;
    return false;
};

/**
 * 
 */
WorldMorph.prototype.Arduino.isFMK2Device = function (port) {
    if(port.productId == 29987 && port.vendorId == 6790)
        return true;
    return false;
};

/**
 * Gets a list of available serial ports (paths) and return it through callback function
 */
WorldMorph.prototype.Arduino.getSerialPorts = function (callback) {
    var myself = this,
        portList = [],
        portcheck = /usb|DevB|rfcomm|acm|^com/i; // Not sure about rfcomm! We must dig further how bluetooth works in Gnu/Linux

    chrome.serial.getDevices(function (devices) { 
        if (devices) { 
            console.log(devices);
            devices.forEach(function (device) { 
                var friendlyport = {}
                if (!myself.isPortLocked(device.path) && portcheck.test(device.path)) {
                    if(myself.isFMKDevice(device)){
                        friendlyport = {name: "FirstMaker (USB)" , path: device.path}
                    }else if(myself.isFMK2Device(device)){
                        friendlyport = {name: "FirstMaker 2 (USB)" , path: device.path}
                    }
                    else{
                        if(portcheck.test(device.path)){
                            friendlyport = {name: device.path , path: device.path}
                        }
                    }
                }
                if(friendlyport.hasOwnProperty('name'))
                    portList.push(friendlyport);
            });
        }
        console.log(portList);
        callback(portList);
    });
    
    /*portcheck = /usb|DevB|rfcomm|acm|^com/i,
   
    fmk1 = /VID_2341&PID_0043/i, //windows pattern for Arduino Uno
    fmk2 = /VID_1a86&PID_7523/i; 
    
    myself.serialPort.list(function (err, devices) { 
        if (devices) { 
            devices.forEach(function(device) { 
                if(!myself.isPortLocked(device.comName)) {
                    if(myself.isFMKDevice(device) || fmk1.test(device.pnpId)){
                        var frienlyPort = {name: 'FirstMakers (USB)', path: device.comName};
                        portList.push(frienlyPort);
                    }
                    else if(myself.isFMK2Device(device) || fmk2.test(device.pnpId)){
                        var frienlyPort = {name: 'FirstMakers 2 (USB)', path: device.comName};
                        portList.push(frienlyPort);
                    }
                    else{
                        if(portcheck.test(device.comName)){
                            var frienlyPort = {name: device.comName, path: device.comName};
                            portList.push(frienlyPort);   
                        }

                    }
                }
            });
        }
        console.log(portList);
        callback(portList);
    });*/
    
};

WorldMorph.prototype.Arduino.processProcessing = function (body) {
    var lines = body.split('\n'),
        header = '/* ============================================\n'
               + ' *        AUTO-Generated by Snap4Arduino\n'
               + ' * ============================================\n'
               + ' *\n'
               + ' * Please review this sketch before pushing it.\n'
               + ' *\n'
               + ' * This is an experimental feature, and there\n'
               + ' * are _several_ Snap!-related functionalities\n'
               + ' * that are, by definition, untranslatable to\n'
               + ' * static languages.\n'
               + ' *\n'
               + ' * There is NO WARRANTY whatsoever that this\n'
               + ' * sketch is going to work exactly in the same\n'
               + ' * way as the original Snap4Arduino script.\n'
               + ' */\n\n',
        setup = 'void setup() {\n',
        servoLines,
        servoPins,
        digitalOutputLines,
        digitalOutputPins,
        digitalInputLines,
        digitalInputPins;
    
    unique = function(anArray) {
        return anArray.filter(function(elem, pos) { 
            return anArray.indexOf(elem) == pos; 
        });
    }

    // let's find out what pins we are using, and for what purpose
    servoLines = lines.filter(function(each) { return each.match(/servo[0-9]*\.write/)} );
    servoPins = unique(servoLines.map(function(each) { return each.replace(/.*servo([0-9]*)\.write.*/g, '$1') }));

    digitalOutputLines = lines.filter(function(each) { return each.match(/digitalWrite/)});
    digitalOutputPins = unique(digitalOutputLines.map(function(each) { return each.replace(/.*digitalWrite\(([0-9]*),.*\).*/g, '$1') }));

    digitalInputLines = lines.filter(function(each) { return each.match(/digitalRead/)});
    digitalInputPins = unique(digitalInputLines.map(function(each) { return each.replace(/.*digitalRead\(([0-9]*)\).*/g, '$1') }));

    // now let's construct the header and the setup body
    if (servoLines.length > 0) { header += '#include <Servo.h>\n\n' };

    servoPins.forEach( function(pin) { 
        header += 'Servo servo' + pin + ';\n'
        setup += '  servo' + pin + '.attach(' + pin + ');\n'
    });

    header += '\n';

    digitalOutputPins.forEach( function(pin){ setup += '  pinMode(' + pin + ', OUTPUT);\n' });
    digitalInputPins.forEach( function(pin){ setup += '  pinMode(' + pin + ', INPUT);\n' });

    // of course, if someone's named their vars this way, we've destroyed their project
    // sorry! :p
    body = body.replace('clockwise', 1200);
    body = body.replace('stopped', 1500);
    body = body.replace('counter-clockwise', 1700);

    if (body.indexOf('void loop()') < 0) {
        setup += body.replace(/\n/g, '\n  ') + '\n';
        body = '\n\nvoid loop() {}\n';
    } 

    setup += '}\n';

    return (header + setup + body);
};
