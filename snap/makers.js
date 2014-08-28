'use strict';

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

// Auxiliary array to keep references to old (disconnected) board objects and avoid conflicts with pending callbacks & interruptions
MakerApp.oldboards = [];

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




