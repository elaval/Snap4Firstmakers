'use strict';

/**
 * Turn on led on pin 13
 */
Process.prototype.makersLedOn = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.digitalWrite(13,true);
	} else {
		throw new Error(localize("Arduino not connected"));
	}

};

/**
 * Turn off led on pin 13
 */
Process.prototype.makersLedOff = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.digitalWrite(13,false);
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

		val = this.reportAnalogReading(1);
		return Math.round(10*100*val/1023.0)/10;
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

		val = this.reportAnalogReading(3);
		return Math.round(10*500*val/1023.0)/10;
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

		val = this.reportAnalogReading(2);
		return Math.round(10*100*val/1023.0)/10;
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

		val = this.reportAnalogReading(0);
		return Math.round(10*100*val/1023.0)/10;
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
 * Gets switch on/off state
 */
Process.prototype.makersSwitch = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		var val;

		val = this.reportDigitalReading(3);

		// Invert true/false value
		return !val;
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








