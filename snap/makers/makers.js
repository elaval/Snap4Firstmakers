'use strict';

/** Copia del archivo s4a/arduino.js **/

function Arduino (owner) {
    this.owner = owner;
    this.board = undefined;	// Reference to arduino board - to be created by new firmata.Board()
    this.connecting = false;	// Flag to avoid multiple attempts to connect
    this.disconnecting = false;  // Flag to avoid serialport communication when it is being closed
    this.justConnected = false;	// Flag to avoid double attempts
    this.keepAliveIntervalID = null;
    this.hostname = 'esp8266.local:23'; // Default hostname and port for network connection
};

// This function just asks for the version and checks if we've received it after a timeout
Arduino.prototype.keepAlive = function () {
    if (world.Arduino.keepAlive) {
        if (this.board.version.major !== undefined) {
            // Everything looks fine, let's try again
            this.board.version = {};
            this.board.reportVersion(nop);
        } else {
            // Connection dropped! Let's disconnect!
            this.disconnect(); 
        }
    }
};

Arduino.prototype.disconnect = function (silent) {
    if (this.isBoardReady()) {
        // Prevent disconnection attempts before board is actually connected
        this.disconnecting = true;
        if (this.port === 'network') {
            this.board.sp.destroy();
        } else {
            this.board.sp.close();
        }
        this.closeHandler(silent);
    } else if (!this.board) {
        // Don't send info message if the board has been connected
        if (!silent) {
            ide.inform(this.owner.name, localize('Board is not connected'))
        }
    } 
};

// This should belong to the IDE
Arduino.prototype.showMessage = function (msg) {
    if (!this.message) { this.message = new DialogBoxMorph() };

    var txt = new TextMorph(
            msg,
            this.fontSize,
            this.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            new Color(255, 255, 255)
            );

    if (!this.message.key) { this.message.key = 'message' + this.owner.name + msg };

    this.message.labelString = this.owner.name;
    this.message.createLabel();
    if (msg) { this.message.addBody(txt) };
    this.message.drawNew();
    this.message.fixLayout();
    this.message.popUp(world);
    this.message.show();
};

Arduino.prototype.hideMessage = function () {
    if (this.message) {
        this.message.cancel();
        this.message = null;
    }
};

Arduino.prototype.attemptConnection = function () {
    var myself = this,
        networkPortsEnabled = Arduino.prototype.networkPortsEnabled;

    if (!this.connecting) {
        if (this.board === undefined) {
            // Get list of ports (Arduino compatible)
            var ports = world.Arduino.getSerialPorts(function (ports) {
                var portMenu = new MenuMorph(this, 'select a port'),
                    portCount = Object.keys(ports).length;
                if (portCount >= 1) {
                    ports.forEach(function (each) {
                        console.log(each);
                        portMenu.addItem(each.name, function () { 
                            myself.connect(each.path);
                        })
                    });
                }
                if (networkPortsEnabled) {
                    portMenu.addLine();
                    portMenu.addItem('Network port', function () {
                        myself.networkDialog();
                    });
                }
                if (networkPortsEnabled || portCount > 1) {
                    portMenu.popUpAtHand(world);
                } else if (!networkPortsEnabled && portCount === 1) {
                    myself.connect(ports[0].path);
                }
            });
        } else {
            ide.inform(myself.name, localize('There is already a board connected to this sprite'));
        }
    }

    if (this.justConnected) {
        this.justConnected = undefined;
        return;
    }
};

Arduino.prototype.closeHandler = function (silent) {

    var portName = 'unknown';

    if (this.board) {
        portName = this.board.sp.path;

        this.board.sp.removeListener('disconnect', this.disconnectHandler);
        this.board.sp.removeListener('close', this.closeHandler);
        this.board.sp.removeListener('error', this.errorHandler);

        this.board = undefined;
    };

    clearInterval(this.keepAliveIntervalID);

    world.Arduino.unlockPort(this.port);
    this.connecting = false;
    this.disconnecting = false;

    if (this.disconnected & !silent) {
        ide.inform(
                this.owner.name,
                localize('Board was disconnected from port\n') 
                + portName 
                + '\n\nIt seems that someone pulled the cable!');
        this.disconnected = false;
    } else if (!silent) {
        ide.inform(this.owner.name, localize('Board was disconnected from port\n') + portName);
    }
};

Arduino.prototype.disconnectHandler = function () {
    // This fires up when the cable is unplugged
    this.disconnected = true;
};

Arduino.prototype.errorHandler = function (err) {
    ide.inform(
            this.owner.name,
            localize('An error was detected on the board\n\n')
            + err,
            this.disconnect(true));
};

Arduino.prototype.networkDialog = function () {
    new DialogBoxMorph(
            this, // target
            'connectNetwork', // action
            this // environment
            ).prompt(
                "Enter hostname or ip address:", // title
                this.hostname, // default
                this.owner.world() // world
                );
};

Arduino.prototype.connectNetwork = function (host) {
    var myself = this,
        net = require('net'),
        hostname = host.split(':')[0],
        port = host.split(':')[1] || 80;

    this.hostname = hostname + ':' + port;

    this.disconnect(true);

    this.showMessage(localize('Connecting to network port:\n' + this.hostname + '\n\n' + localize('This may take a few seconds...')));
    this.connecting = true;

    var client = net.connect(
            { 
                host: hostname,
                port: port
            },
            function () {
                var socket = this;
                myself.board = new world.Arduino.firmata.Board(socket, function(err) {
                    if (!err) {
                        // Clear timeout to avoid problems if connection is closed before timeout is completed
                        clearTimeout(myself.connectionTimeout);

                        // Start the keepAlive interval
                        myself.keepAliveIntervalID = setInterval(function () { myself.keepAlive }, 5000);

                        myself.board.sp.on('disconnect', myself.disconnectHandler);
                        myself.board.sp.on('close', myself.closeHandler);
                        myself.board.sp.on('error', myself.errorHandler);

                        myself.port = 'network';
                        myself.connecting = false;
                        myself.justConnected = true;
                        myself.board.connected = true;
                        myself.board.sp.path = myself.hostname;

                        myself.hideMessage();
                        ide.inform(myself.owner.name, localize('An Arduino board has been connected. Happy prototyping!'));
                    } else {
                        myself.hideMessage();
                        ide.inform(myself.owner.name, localize('Error connecting the board.\n') + err, myself.closeHandler(true));
                    }
                    return;
                });
            });

    client.on('error', function(err) {
        myself.hideMessage();
        if (err.code === 'EHOSTUNREACH') {
            ide.inform(
                    myself.owner.name, 
                    localize('Unable to connect to board\n')
                    + myself.hostname + '\n\n'
                    + localize('Make sure the board is powered on'));
        } else if (err.code === 'ECONNREFUSED') {
            ide.inform(
                    myself.owner.name,
                    localize('Unable to connect to board\n')
                    + myself.hostname + '\n\n'
                    + localize('Make sure the hostname and port are correct'));
        } else {
            ide.inform(myself.owner.name, localize('Unable to connect to board\n') + myself.hostname);
        }
        client.destroy();
        myself.connecting = false;
        myself.justConnected = false;
    });
};

Arduino.prototype.connect = function (port) {
    var myself = this;

    this.disconnect(true);

    this.showMessage(localize('Connecting board at port\n') + port);
    this.connecting = true;

    this.board = new world.Arduino.firmata.Board(port, function (err) { 
        if (!err) { 

            // Clear timeout to avoid problems if connection is closed before timeout is completed
            clearTimeout(myself.connectionTimeout); 

            // Start the keepAlive interval
            myself.keepAliveIntervalID = setInterval(function() { myself.keepAlive() }, 5000);

            myself.board.sp.on('disconnect', myself.disconnectHandler);
            myself.board.sp.on('close', myself.closeHandler);
            myself.board.sp.on('error', myself.errorHandler);

            world.Arduino.lockPort(port);
            myself.port = myself.board.sp.path;
            myself.connecting = false;
            myself.justConnected = true;
            myself.board.connected = true;

            myself.hideMessage();
            ide.inform(myself.owner.name, localize('An Arduino board has been connected. Happy prototyping!'));   
        } else {
            myself.hideMessage();
            ide.inform(myself.owner.name, localize('Error connecting the board.') + ' ' + err, myself.closeHandler(true));
        }
        return;
    });

    // Set timeout to check if device does not speak firmata (in such case new Board callback was never called, but board object exists) 
    this.connectionTimeout = setTimeout(function () {
        // If !board.versionReceived, the board has not established a firmata connection
        if (myself.board && !myself.board.versionReceived) {
            var port = myself.board.sp.path;

            myself.hideMessage();
            ide.inform(
                    myself.owner.name,
                    localize('Could not talk to Arduino in port\n')
                    + port + '\n\n' + localize('Check if firmata is loaded.')
                    );

            // silently closing the connection attempt
            myself.disconnect(true); 
        }
    }, 10000);
};

Arduino.prototype.isBoardReady = function () {
    return ((this.board !== undefined) 
            && (this.board.pins.length > 0) 
            && (!this.disconnecting));
};

Arduino.prototype.pinsSettableToMode = function (aMode) {
    // Retrieve a list of pins that support a particular mode
    var myself = this,
        pinNumbers = {};

    this.board.pins.forEach(
        function (each) { 
            if (each.supportedModes.indexOf(aMode) > -1) { 
                var number = myself.board.pins.indexOf(each).toString(); 
                pinNumbers[number] = number;
            }
        }
    );

    return pinNumbers;
};



/**
 * MakerApp objects encapsulates all 'makers' global functions and variables
 * (used to keep clean the original Snap4Arduino code and avoid namespace conflicts)
 *
 * Defined in this file:
 * MakerApp
 * MakerApp.Q
 * MakerApp.makersStartArduinoAutoConnect
 * MakerApp.makersStopArduinoAutoConnect
 * MakerApp.findCompatibleUSBPorts
 * MakerApp.makersAttemptToConnectArduino
 */

// Global object to encapsulate general variables and functions related to Makers functionality
var MakerApp = {};
MakerApp.systemSlash = process.platform ==='win32'? '/':'\\';

MakerApp.userHomePath = process.env.HOME || process.env.USERPROFILE;


// Auxiliary array to keep references to old (disconnected) board objects and avoid conflicts with pending callbacks & interruptions
MakerApp.oldboards = [];

MakerApp.currentProjectPath = '';

// Number of seconds for retrying arduino connection
MakerApp.connectRetryTime = 10;

// Flag to avoid multiple connections
MakerApp.connecting = false;

// Q functionality for managing Javascript promises
MakerApp.Q = require('q');

var SerialPort = require('serialport');

process.on('uncaughtException', function (err) {
	console.log("uncaughtException", err);
});

/*
 * Helper function that presents a Morph compatible dialog box with information (alert )
 *
 * @param {msg} Text message to be displayed.
 */
MakerApp.inform = function(msg) {
	// Check if there is a global WorldMorph (which should be the case)
	if (typeof world !== 'undefined') {
		new DialogBoxMorph().inform('FirstMakers',msg, world);
	}
};

/**
 * If no board is connected, check if a new USB device is available and try to connect
 * every 30 seconds
 */
MakerApp.makersStartArduinoAutoConnect = function() {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

	if (!MakerApp.connecting) {

		MakerApp.findCompatibleUSBPorts()
		.then(function(port) {
			MakerApp.connecting = true;
			return MakerApp.openBoardConnection(port);
		})
		.then(function(board) {
			var msg = 'Arduino board connected at\n';
			msg += 'port ' +board.sp.path+'\n\n';
			msg +=  'Caution: Do not unplug de board while\n';
			msg +=  'connected (the program could crash)';
			
			MakerApp.connecting = false;
			MakerApp.inform(msg);
		})
		.fail(function(err) {
			MakerApp.connecting = false;

			if (err.message === 'timeout') {
				// The board was not opened within a timeou period this could be because:
				// i) the serial port does not speaks 'firmata'.  In this case no board object was created
				// ii) the serial port is hanged to a previous (corrupted?) connection.  In this case a board object was created but with a faulty serial port (and no pins in boartd.pins)

				var msg = 'Could not open detected board.\n\n';
				msg += 'Have you connected an Arduino with\n';
				msg += 'StandardFirmata firmware?\n\n';
				msg += 'We suggest you to quit the program,\n';
				msg += 'unplug & plug the USB cable and then\n';
				msg += 'run the program again.';

				// If we created an unsuccesffuly connected baord, let's clean in tup (and hide it away)
				if (board) {
					// We keep in in 'oldboards' to avoid conflicts with live async calls
					MakerApp.oldboards.push(board);
					board = null;
				} 

				MakerApp.inform(msg);


			} else {
				MakerApp.inform(err.message);	
			}
			
		});


	}

	//MakerApp.makersAttemptToConnectArduino();

	/*
	if (MakerApp.connectInterval) {
		// Clear any existing interval call for AttemptToConnectArdiuno
		clearInterval(MakerApp.connectInterval);
	}

		// Retry connection every MakwrApp.connectRetryTime seconds
		MakerApp.connectInterval = setInterval(MakerApp.makersAttemptToConnectArduino, MakerApp.connectRetryTime*1000);
	*/
};

MakerApp.isBoardConnected = function() {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

	return (typeof board !== 'undefined') && (board!== null) && (board.pins.length > 0);
};

MakerApp.makersStopArduinoAutoConnect = function() {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

	if (!MakerApp.connecting) {
		var port = null;
		if (board && board.sp) {
			port = board.sp.path;
		}

		MakerApp.closeBoardConnection()
		.then(function() {
			MakerApp.inform('Arduino board disconnected from\nport '+port);
		})
		.fail(function(err) {
			MakerApp.inform(err.message);
		});
	}

};



/**
 * Gets a list of active USB ports that are compatible with Arduino devices
 */
MakerApp.findCompatibleUSBPorts = function() {

	// User deferred promises to get th easync result
	var deferred = MakerApp.Q.defer();


	// Get a list of active serial ports
	SerialPort.list(function(err, result) {
		if (err) {
			deferred.reject(err);
		} else {

	    	var ports,
	        length;

	        // Filter the ports to select only those 'arduino' compatible
	    	ports = result.filter(function(val) {
	        	var available = true;

		        // Get compatible ports -> Match only ports that Arduino cares about
		        // ttyUSB#, cu.usbmodem#, COM#
		        var rport = /usb|acm|^com/i;
		        if (!rport.test(val.comName)) {
		          available = false;
		        }

	        	return available;
	      	}).map(function(val) {
	        	return val.comName;
	      	});

	      	// Get number of compatible ports
	      	length = ports.length;

			// If no ports are detected when scanning /dev/, then there is
			// nothing left to do and we can safely exit the program
			if (!length) {
				// Alert user that no devices were detected
				console.log('Board', 'No USB devices detected');

				// Return (not that it matters, but this is a good way
				// to indicate to readers of the code that nothing else
				// will happen in this function)
				var newerr = new Error('No Arduino device found on USB ports');
				newerr.name = 'NoUSBError';
				deferred.reject(newerr);
			} else {
				console.log(
					'Device(s)',
					ports.toString().grey
				);

		      	// Get the first available device path from the list of
		      	// detected ports
		      	deferred.resolve(ports[0]);
			}

		}





    }.bind(this));

	return deferred.promise;
};


/**
 * Attempts to connect a new firmata board on the specified port
 * 
 * @param {string} port path to the port to be opened.
 *
 * @return {promise} promise for the new created board.
 */
MakerApp.openBoardConnection = function(port) {
	var sprite = world.children[0].currentSprite;

	// User deferred promises to get th easync result
	var deferred = MakerApp.Q.defer();
 
	// If found, attempt connection (if global board is still not defined)
	if (!MakerApp.isBoardConnected()) {
		sprite.arduino.board = new firmata.Board(port, function(err) {
			if (err) {
				deferred.reject(err);
				console.log(err);
			} else {
				deferred.resolve(board);
				//MakerApp.inform('An Arduino board has been connected at \nport '+port, world);
				//alert('An Arduino board has been connected at port '+port);
				console.log('An Arduino board has been connected. Happy prototyping!');
				board.sp.on('disconnect', function(a) {alert("disconnect "+a)});
				board.sp.options.disconnectedCallback = function() {alert("disc")};

			}
			MakerApp.state = null;
		});		
	} else {
		var err = new Error('Board was already open');
		err.name = 'AlreadyOpenError';
		deferred.reject(err);
	}

	// If the promised is not resolved in 10 seconds, reject it
	return deferred.promise.timeout(10000, 'timeout');
};

/**
 * Closes a board connection
 *
 */
MakerApp.closeBoardConnection = function() {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

	// User deferred promises to get th easync result
	var deferred = MakerApp.Q.defer();

	if ((typeof board !== 'undefined') && (board!==null)) {
		var port = board.sp.path;

		//MakerApp.serialPortSafeClose2(function(err) {
		MakerApp.serialPortSafeClose2(function(err) {
			if (err) {
				deferred.reject(err);
				//MakerApp.inform(err);
			} else {
				deferred.resolve(port)
				//MakerApp.inform("closed");
				MakerApp.oldboards.push(board);
				board = null;
			}

			
		})
/*
		// Check if serialport has 'disconnected' function which avoids closing errors
		if (board.sp.disconnected) {
			board.sp.disconnected(function(err) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(port);
				}
			});
		} 

		// Use own close functionality based on 'disconnected'
		else {
			MakerApp.serialPortSafeClose(board.sp, function(err) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(port);
				}

			}); 
		}
		*/

		// Housekeeping - hide board in oldboards array (in case of active listeners)
		MakerApp.oldboards.push(board);
		board = null;

	} else {
		var err = new Error('There is no device currently connected');
		err.name = 'NoDeviceError';
		deferred.reject(err);
	}

	return deferred.promise;
};


/**
 * Attempt to create a board object (firmata connection) on the given port
 */
MakerApp.makersAttemptToConnectArduino = function() {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

	if ((typeof board === 'undefined') || (board===null))  {

		// First, try to find a compatible board
		MakerApp.findCompatibleUSBPorts()
		.then(function(port) {
			return MakerApp.openBoardConnection(port);
		})
		.then(function(board) {
			MakerApp.inform('An Arduino board has been connected at \nport '+board.sp.path, world);
		})
		.fail(function(err) {
			if (err.message ==='timeout') {
				MakerApp.inform('Connection failed\nYou may need to disconnect and \nreconnect your device', world);
			} else {
				MakerApp.inform('Connection failed '+err.message);
			}
			
		});		
	} else {
		MakerApp.inform('There is a board already connected.');
	}
};

/**
 * When closing the serialport with the serialport.close() function
 * we could eventually get uncaught 'EBADF, read' errors which might crash the Application  
 *  
 * This is an alternative closing method that should not give errors.  It is 
 * based on serialport 'diconnected' function which might not be implemented in all versions of serialport
 */ 
MakerApp.serialPortSafeClose = function(sp, callback) {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;

    var self = sp;
    var fd = self.fd;
    var factory = require('serialport');

    // send notification of disconnect
    if (self.options.disconnectedCallback) {
      self.options.disconnectedCallback();
    } else {
      self.emit('disconnect');
    }
    self.paused = true;
    self.closing = true;

    self.emit('close');

    // clean up all other items
    try {
      factory.SerialPortBinding.close(fd, function (err) {
      });
    } catch (e) {
      //handle silently as we are just cleaning up the OS.
    }

    self.removeAllListeners();
    self.closing = false;
    self.fd = 0;

    if (process.platform !== 'win32') {
      self.readable = false;
      self.serialPoller.close();
    }

    if (callback) {
      callback();
    }
};

MakerApp.serialPortSafeClose2 = function(callback) {
	var sprite = world.children[0].currentSprite;
	var board = sprite.arduino.board;


	var sp = board.sp;
	var factory = require('serialport');

	sp.options.disconnectedCallback = function() {alert("disc")};


    // clean up all other items
    var fd = sp.fd;
    try {
      factory.SerialPortBinding.close(fd, function (err) {
      	alert(err);
      });
    } catch (e) {
    	alert(e);
      //handle silently as we are just cleaning up the OS.
    }

    sp.removeAllListeners();
    sp.fd = 0;

    if (process.platform !== 'win32') {
      sp.readable = false;
      sp.serialPoller.close();
    }

    if (callback) {
      callback();
    }
}

/**
 * Functions for trasnforming analog values [0,1023] into measures
 */

MakerApp.convertAnalogMeasure = {
	// Temperature sensor LW35
	// Each 10 mV is 1 degree celsius
	'temperatureLW35' : function(val) {
		var millivolts = val*5000.0/1023.0,
		 	celsius = millivolts/10;

		// return rouded to 1 decimal
		return Math.round(10*celsius)/10;
	},

	// Potentiometer - gives (0 to 5 volts)
	'potentiometer' : function(val) {
		var percentage = 100.0*val/1023.0;

		// return rouded to 1 decimal
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
	}


}

//global bluetooth
/*var Bluetooth = new (require('bluetooth-serial-port')).BluetoothSerialPort();
Bluetooth.on('found', MakerApp.listBluetoothDevices(address, name));
Bluetooth.inquire();

MakerApp.listBluetoothDevices = function(address, name){
    console.log(name+" "+address);
}*/




