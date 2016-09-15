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
		this.setPinMode(6,['PWM']);
		this.pwmWrite(6,60);//Peticion bajar la intensidad del buzzer
	} else {
		throw new Error(localize("Arduino not connected"));
	}
};

/**
 * Sets  buzzer to max 
 */
Process.prototype.makersBuzzerOff = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(6,['PWM']);
		this.pwmWrite(6,0);
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
		var val = this.reportAnalogReading(0);
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
		var val = this.reportAnalogReading(1);
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
		var val = this.reportAnalogReading(2);
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
		var val = this.reportAnalogReading(3);
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
		var val = this.reportAnalogReading(4);
		return world.makers.convertAnalogMeasure.infrared(val);
	} else {
		throw new Error(localize("Arduino not connected"));
	}

};

/**
 * Gets potentiometer value (in scale of 1 to 100)
 */
Process.prototype.makersPotentiometer = function () {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {

		var val = this.reportAnalogReading(5);
		return world.makers.convertAnalogMeasure.potentiometer(val);
	} else {
		throw new Error(localize("Arduino not connected"));
	}

};




/**
 * Gets switch on/off state
 */
Process.prototype.makersSwitch = function() {
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
        var val;
        this.setPinMode(2,['digital input']);
		val = this.reportDigitalReading(2);
		return val;
	} else {
		throw new Error(localize("Arduino not connected"));
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
Process.prototype.makersSetPWMV2 = function(pin,value) {
    var sprite = this.homeContext.receiver;
    var val = value*255/100.0

	if (sprite.makersIsBoardConnected()) {
        var pinValue = 10;
        switch(pin){
            case 'D0':
                pinValue = 10;
                break;
            case 'D1':
                pinValue = 11;
                break;
            default:
                throw new Error(localize("Invalid pin \n should be D0 or D1"));
                break;
        }
        this.setPinMode(pinValue,['PWM']);
		this.pwmWrite(pinValue,val);
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
		    	throw new Error(localize("Invalid pin \n should be A0, A1, A2, A3, A4 or A5"));
		        break;
		}
	} else {
		throw new Error(localize("Arduino not connected"))
	}


};
    
Process.prototype.makersReportDigitalPin = function(pin)
{
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		switch(pin) {
                
		    case 3:
		        return this.reportDigitalReading(3);
		        break;
		    case 8:
		        return this.reportDigitalReading(8);
		        break;
		    case 9:
		        return this.reportDigitalReading(9);
		        break;
		    case 10:
		        return this.reportDigitalReading(10);
		        break;
		    case 11:
		        return this.reportDigitalReading(11);
		        break;
		    case 12:
		        return this.reportDigitalReading(12);
		        break;
		    default:
		    	throw new Error(localize("Invalid pin \n should be 3, 8, 9, 10, 11 or 12"));
		        break;
		}
	} else {
		throw new Error(localize("Arduino not connected"))
	}
}

Process.prototype.makersReportDigitalPinV2 = function(pin)
{
    var sprite = this.homeContext.receiver;

	if (sprite.makersIsBoardConnected()) {
		switch(pin) {
                
		    case 'D0':
		        return this.reportDigitalReading(10);
		        break;
		    case 'D1':
		        return this.reportDigitalReading(11);
		        break;
		    case 'D2':
		        return this.reportDigitalReading(12);
		        break;
		    default:
		    	throw new Error(localize("Invalid pin \n should be D0, D1 or D2"));
		        break;
		}
	} else {
		throw new Error(localize("Arduino not connected"))
	}
}

Process.prototype.makersServoWrite = function(pin,value)
{
    var sprite = this.homeContext.receiver,
    board = sprite.arduino.board;
	if (sprite.makersIsBoardConnected()) {
		this.setPinMode(pin,['servo']);
		var numericValue;
		switch (value[0]) {
			case "clockwise":
				numericValue = 1200;
			     break;
			case "counter-clockwise":
				numericValue = 1700;
			    break;
			case "stopped":
				numericValue = 1500;
			    break;
			default:
				numericValue = value;
			    break;
		}
        //console.log('servo en: '+ numericValue +' grados' +' en el pin '+pin);
		board.servoWrite(pin, numericValue);
		return null;

		
	} else {
		throw new Error(localize("Arduino not connected"));
	}
};

/***************************************
*   
****************************************/
Process.prototype.makersServoWriteV2 = function (pin, value) {
    console.log(pin);
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var pinValue = 3;
        if(pin !== undefined){
            switch (pin) {
                case 'D0':
                    pinValue = 10;
                    break;
                case 'D1':
                    pinValue = 11;
                    break;
                case 'D2':
                    pinValue = 12;
                    break;
                default:
                    pinValue = 3;
                    break;
                }
        }
        console.log('sending servo v2 pin: '+ pinValue + ' value: '+ value);
        this.makersServoWrite(pinValue, value);
    } else {
        throw new Error(localize("Arduino not connected"));
    }
}

Process.prototype.outputDigitalOff = function(pin){
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var pinValue;
        switch(pin){
            case 'D1':
                pinValue = 11;
                break;
            case 'D2':
                pinValue = 12;
                break;
            default:
                pinValue = 10;
                break;
        }
        this.setPinMode(pinValue,['digital output']);
		this.digitalWrite(pinValue,false);
	} else {
		throw new Error(localize("Arduino not connected"));
	}
}

Process.prototype.outputDigitalOn = function(pin){
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var pinValue;
        switch(pin){
            case 'D1':
                pinValue = 11;
                break;
            case 'D2':
                pinValue = 12;
                break;
            default:
                pinValue = 10;
                break;
        }
		this.setPinMode(pinValue,['digital output']);
		this.digitalWrite(pinValue,true);
	} else {
		throw new Error(localize("Arduino not connected"));
	}
}
/*
*Controla el sentido de giro y velocidad de un motor para la tarjeta fmv2.
*/
Process.prototype.makersMotor = function(spinValue,speed){
    var sprite = this.homeContext.receiver,
    board = sprite.arduino.board;
    if(sprite.makersIsBoardConnected()){

        if(spinValue =='1')
            speed = 255-(speed*255/100.0)
        else
            speed = speed*255/100.0;
        
        this.setPinMode(9,['PWM']);
        this.pwmWrite(9,speed);
        this.setPinMode(8,['digital output']);
        this.digitalWrite(8,spinValue);      
    }else
        {
        throw new Error(localize("Arduino not connected"));   
    }
}
/*****/

Process.prototype.makersExtMotor = function(spinValue, speed){
    var sprite = this.homeContext.receiver,
    board = sprite.arduino.board;
    if(sprite.makersIsBoardConnected()){

        if(spinValue =='1')
            speed = 255-(speed*255/100.0)
        else
            speed = speed*255/100.0;
        
        this.setPinMode(11,['PWM']);
        this.pwmWrite(11,speed);
        this.setPinMode(10,['digital output']);
        this.digitalWrite(10,spinValue);      
    }else
        {
        throw new Error(localize("Arduino not connected"));   
    }
}
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


/**
 * Gets temperature from http://api.openweathermap.org
 */
Process.prototype.reportWeather = function (location) {
    var response;
    if (!this.httpRequest) {
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.open("GET", 'http://api.openweathermap.org/data/2.5/find?q=' + location, true);
        this.httpRequest.send(null);
    } else if (this.httpRequest.readyState === 4) {
        response = JSON.parse(this.httpRequest.responseText);

        this.httpRequest = null;
        // return temp in Celcius
        return response.list[0].main.temp-273.15;
    }
    this.pushContext('doYield');
    this.pushContext();
};


Process.prototype.reportXively = function(datastream, feed, key) {
	var request = require('request');

	if (!this.xivelyRequest) {
		this.xivelyResponse = null
		var url = 'https://api.xively.com/v2/feeds/'+feed+'/datastreams/'+datastream+'.json?key='+key
		this.xivelyRequest = request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body) // Print the google web page.
		    this.xivelyResponse = response;
		  }
		}.bind(this))
	} else if (this.xivelyResponse) {
		this.xivelyRequest = null;
		return JSON.parse(this.xivelyResponse.body).current_value;
	}

	this.pushContext('doYield');
    this.pushContext();
}

Process.prototype.setThingSpeakKey = function(key) {
	var sprite = this.homeContext.receiver;

	sprite.arduino.thingSpeakKey = key
}

Process.prototype.setThingSpeakChannel = function(key) {
	var sprite = this.homeContext.receiver;

	sprite.arduino.thingSpeakChannel = key
}


Process.prototype.reportThingSpeak = function(field, channel, key) {
	var sprite = this.homeContext.receiver,
		url,
		request = require('request');

	if (!this.thingSpeakRequest) {
		this.thingSpeakResponse = null
		if (key) {
			url = 'https://api.thingspeak.com/channels/'+channel+'/field/'+field+'/last?key='+key;
		} else {
			url = 'https://api.thingspeak.com/channels/'+channel+'/field/'+field+'/last';
		}

		this.thingSpeakRequest = request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    this.thingSpeakResponse = response;
		  } else if (!error){
		  	this.thingSpeakRequest = null;
		  	throw new Error(localize('Wrong request (have you set the right Channel / Key?)'));
		  	return
		  } else {
		  	this.thingSpeakRequest = null;
		  	throw new Error(localize(error));
		  	return
		  }
		}.bind(this))
	} else if (this.thingSpeakResponse) {
		this.thingSpeakRequest = null;
		return this.thingSpeakResponse.body;
	}

	this.pushContext('doYield');
    this.pushContext();
}


Process.prototype.updateThingSpeak = function(value, field, channel, key) {
	var sprite = this.homeContext.receiver,
		url;

	//var key = sprite.arduino.thingSpeakKey ? sprite.arduino.thingSpeakKey : null;
	//var channel = sprite.arduino.thingSpeakChannel ? sprite.arduino.thingSpeakChannel : null;

	var request = require('request');

	if (!this.thingSpeakRequest) {
		this.thingSpeakResponse = null

		url = 'https://api.thingspeak.com/update?key='+key+'&field'+field+'='+value;

		this.thingSpeakRequest = request.post(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    this.thingSpeakResponse = response;
		  }
		}.bind(this))
	} else if (this.thingSpeakResponse) {
		this.thingSpeakRequest = null;
		return this.thingSpeakResponse.body;
	}

	this.pushContext('doYield');
    this.pushContext();
}

Process.prototype.soilMoisture = function(pin){
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var value = this.makersReadSensor(pin);
        return Math.round((100.0*value/900.0) * 10 ) / 10;     
    }
    else{
        throw new Error(localize("Arduino not connected"));
    }
}

Process.prototype.temperatureProbe = function(pin){
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var vr = this.makersReadSensor(pin) * (5/1023);
        var rt = (vr*10000) / (5 - vr);
        var celsius = (1/3470)* Math.log(rt/10000) + 1/298;
        celsius = (1/celsius) - 273;
        return  Math.round(celsius*10)/10;         
    }
    else{
        throw new Error(localize("Arduino not connected"));
    }
}


/****/
Process.prototype.makersBatteryLevel = function(){
    var sprite = this.homeContext.receiver;
    if (sprite.makersIsBoardConnected()) {
        var adc = this.reportAnalogReading(6);
        return (12400*5*adc)/(1024*10000);
    }
    else{
        throw new Error(localize("Arduino not connected"));
    }
}

