'use strict';

/**
 * Turn on led on pin 13
 */
Process.prototype.makersLedOn = function (ledcolor) {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		switch(ledcolor) {
		    case 'w':
		        this.digitalWrite(13,true);
		        break;
		    case 'r':
		        this.digitalWrite(7,true);
		        break;
		    case 'y':
		        this.digitalWrite(5,true);
		        break;
		    case 'g':
		        this.digitalWrite(4,true);
		        break;
		    default:
		        ;
		}
	} else {
		throw new Error(localize("Arduino not connected"));
	}

};

/**
 * Turn off led on pin 13
 */
Process.prototype.makersLedOff = function (ledcolor) {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		switch(ledcolor) {
		    case 'w':
		        this.digitalWrite(13,false);
		        break;
		    case 'r':
		        this.digitalWrite(7,false);
		        break;
		    case 'y':
		        this.digitalWrite(5,false);
		        break;
		    case 'g':
		        this.digitalWrite(4,false);
		        break;
		    default:
		        ;
		}
	} else {
		throw new Error(localize("Arduino not connected"))
	}

	
};

/**
 * Sets signal level for the buzzer
 */
Process.prototype.makersBuzzer = function(buzzlevel) {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(6,['PWM']);
		this.pwmWrite(6,buzzlevel);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};

/**
 * Sets  buzzer to max 
 */
Process.prototype.makersBuzzerOn = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(6,['digital output']);
		this.digitalWrite(6,true)
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};

/**
 * Sets  buzzer to max 
 */
Process.prototype.makersBuzzerOff = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(6,['digital output']);
		this.digitalWrite(6,false)
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};


/**
 * Gets temperature value (in Celcius degrees)
 */
Process.prototype.makersTemperature = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(0);
		return world.makers.convertAnalogMeasure.temperatureLW35(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};

/**
 * Gets light value (in scale of 1 to 100)
 */
Process.prototype.makersLight = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(1);
		return world.makers.convertAnalogMeasure.light(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}


};

/**
 * Gets potentiometer value (in scale of 1 to 100)
 */
Process.prototype.makersAudio = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(2);
		return world.makers.convertAnalogMeasure.audio(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};

/**
 * Gets humidity value (in scale of 1 to 100)
 */
Process.prototype.makersHumidity = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(3);
		return world.makers.convertAnalogMeasure.humidity(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};


/**
 * Gets infrared value (true/false)
 */
Process.prototype.makersInfrared = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(4);
		return world.makers.convertAnalogMeasure.infrared(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};

/**
 * Gets potentiometer value (in scale of 1 to 100)
 */
Process.prototype.makersPotentiometer = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportAnalogReading(5);
		return world.makers.convertAnalogMeasure.potentiometer(val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}

};




/**
 * Gets switch on/off state
 */
Process.prototype.makersSwitch = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportDigitalReading(2);

		return val;
	} else {
		throw new Error(localize("Arduino not connected"))
	}


};

/**
 * Turn on an external actuator
 */
Process.prototype.makersTurnOnActuator = function(pin) {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(pin,['digital output']);
		this.digitalWrite(pin,true)
	} else {
		throw new Error(localize("Arduino not connected"))
	}
};

/**
 * Turn off an external actuator
 */
Process.prototype.makersTurnOffActuator = function(pin) {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(pin,['digital output']);
		this.digitalWrite(pin,false)
	} else {
		throw new Error(localize("Arduino not connected"))
	}


};

/**
 * Turn off an external actuator
 */
Process.prototype.makersSetPWM = function(pin,value) {
    var sprite = this.homeContext.receiver;
    var val = value*255/100.0

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(pin,['PWM']);

		this.pwmWrite(pin,val);
	} else {
		throw new Error(localize("Arduino not connected"))
	}
};


Process.prototype.makersReadSensor = function(pin)
{
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		switch(pin) {
		    case 'A0':
		        return this.reportAnalogReading(0);
		        break;
		    case 'A1':
		        return this.reportAnalogReading(1);
		        break;
		    case 'A2':
		        return this.reportAnalogReading(2);
		        break;
		    case 'A3':
		        return this.reportAnalogReading(3);
		        break;
		    case 'A4':
		        return this.reportAnalogReading(4);
		        break;
		    case 'A5':
		        return this.reportAnalogReading(5);
		        break;
		    default:
		    	throw new Error(localize("Invalid pin "+pin+"\n(should be A0, A1, A2, A3, A4 or A5"));
		        break;
		}
	} else {
		throw new Error(localize("Arduino not connected"))
	}


};
    


/*
/**
 * Sends user to Twiiter Authentication Screen for getting a PIN
 */
Process.prototype.makersGetTwitterPin = function() {
	
	var gui = require('nw.gui');

	if (MakerApp.twitter.twitterAPI === undefined) {
		var twitterAPI = require('node-twitter-api');
		MakerApp.twitter.twitterAPI = new twitterAPI({
		    consumerKey: MakerApp.twitter.APIKey,
		    consumerSecret: MakerApp.twitter.APISecret,
		    callback: 'oob'
		});
	}

	MakerApp.twitter.twitterAPI.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	    if (error) {
	        console.log('Error getting OAuth request token : ' + error);
	    } else {
	    	console.log('Got request token from Twitter');
	    	MakerApp.twitter.requestToken = requestToken;
	    	MakerApp.twitter.requestTokenSecret = requestTokenSecret;
	    	gui.Shell.openExternal('https://twitter.com/oauth/authenticate?oauth_token='+requestToken);
	    }
	});

	return "OK";
    
};


Process.prototype.makersSetTwitterPin = function(oauth_verifier) {

	if (MakerApp.twitter.requestToken === undefined) {
		alert('You need to request a twitter PIN before connecting');
	} else
	{
		MakerApp.twitter.twitterAPI.getAccessToken(MakerApp.twitter.requestToken, MakerApp.twitter.requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
		    if (error) {
		        console.log(error);
		    } else {
		    	MakerApp.twitter.accessToken = accessToken;
		    	MakerApp.twitter.accessTokenSecret = accessTokenSecret;
		    	console.log('Got access token for Twritter account',results);
		        //store accessToken and accessTokenSecret somewhere (associated to the user)
		        //Step 4: Verify Credentials belongs here
		    }
		});
	}
};

Process.prototype.makersSendTweet = function(msg) {
	if (world.makers.twitter.accessToken !== undefined) {
		world.makers.twitter.twitterAPI.statuses('update', {
		        status: msg
		    },
		    world.makers.twitter.accessToken,
		    world.makers.twitter.accessTokenSecret,
		    function(error, data, response) {
		        if (error) {
		            console.log(error)
		        } else {
		            console.log("Tweet sent", response)
		        }
		    }
		);
	} else {
		console.log("No accessToken");
		throw new Error("Twitter access not authorised")
		
	}
   
};








