Process.prototype.connectArduino = function (port) {
    var sprite = this.homeContext.receiver;

	if (!sprite.arduino.connecting) {
		sprite.arduino.connecting = true;
		if (sprite.arduino.board === undefined) {
			sprite.arduino.board = new world.arduino.firmata.Board(port, function(err) { 
				if (!err) { 
					world.arduino.lockPort(port);
					sprite.arduino.connecting = false;
					sprite.arduino.justConnected = true;
					sprite.arduino.board.connected = true;
					inform('Board connected', 'An Arduino board has been connected. Happy prototyping!');   
				}
				return
			})
		}
	}

	if (sprite.arduino.justConnected) {
		sprite.arduino.justConnected = undefined;
		return;
	}

	if (sprite.arduino.board && sprite.arduino.board.connected) {
		throw new Error('Board already connected');
	}

	this.pushContext('doYield');
	this.pushContext();
}

