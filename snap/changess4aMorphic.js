/*
    Changes to WorldMorph for managing Snap4Arduino functions
*/

WorldMorph.prototype.arduino.lockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) === -1) {
        usedPorts.push(port);
    }
}

WorldMorph.prototype.arduino.unlockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) > -1) {
        usedPorts.splice(usedPorts.indexOf(port));
    }
}

WorldMorph.prototype.arduino.isPortLocked = function (port) {
    return (this.usedPorts.indexOf(port) > -1)
}


/**
 * Gets a list of available serial ports (paths) and return it through callback function
 */
WorldMorph.prototype.arduino.getSerialPorts = function (callback) {
    var myself = this;

    var portList = [];
    var portcheck = /usb|acm|^com/i;

    myself.serialport.list(function (err, ports) { 
        if(ports){ 
            ports.forEach(function(each) { 
                if(!myself.isPortLocked(each.comName) && portcheck.test(each.comName)) {
                    portList[each.comName] = each.comName; 
                }
            });
        }
        callback(portList);
    });
    
};


WorldMorph.prototype.arduino.closeConnection = function (sprite) {
    if (sprite.arduino.board) {
        sprite.arduino.board.reset();
        sprite.arduino.board.sp.close(function(err) {
            if (err) {alert(err)};
            sprite.arduino.board = undefined;
        })

    }

}

