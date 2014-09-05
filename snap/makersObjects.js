'use strict';
/**
* Makers extension for Snap4Arduino
* We create an additional block group - makers - with specific functions for the Makers shield for arduino
*/

SpriteMorph.prototype.makersIsBoardConnected = function() {
    var sprite = this;

    return ((sprite.arduino.board !== undefined) && (sprite.arduino.board.pins.length>0));
}


/**
* We create areference to the origina Block definition following the same apporach as snap4arduino
*/
StageMorph.prototype.originalBlockTemplates_Makers = StageMorph.prototype.blockTemplates;
SpriteMorph.prototype.originalBlockTemplates_Makers = SpriteMorph.prototype.blockTemplates;


// Definition of a new Makers Category

SpriteMorph.prototype.categories =
    [
        'motion',
        'control',
        'looks',
        'sensing',
        'sound',
        'operators',
        'pen',
        'variables',
        'lists',
        'arduino',
        'makers',
        'other'
    ];

SpriteMorph.prototype.blockColor = {
    motion : new Color(74, 108, 212),
    looks : new Color(143, 86, 227),
    sound : new Color(207, 74, 217),
    pen : new Color(0, 161, 120),
    control : new Color(230, 168, 34),
    sensing : new Color(4, 148, 220),
    operators : new Color(98, 194, 19),
    variables : new Color(243, 118, 29),
    lists : new Color(217, 77, 17),
    arduino: new Color(64, 136, 182),
    makers : new Color(64, 64, 230),
    other: new Color(150, 150, 150)
};


// Definition of our new primitive blocks
function overridenBlockTemplates(category) {
    var  myself = this;

    //var variableWatcherToggle = SpriteMorph.prototype.originalBlockTemplates_Makers.variableWatcherToggle;

    
   function watcherToggle(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category]
                );
            },
            null,
            function () {
                return myself.showingWatcher(selector);
            },
            null
        );
    }

    // Button definitions
    // Buttons are push buttons displayed in the block group area
    // which can trigger actions but are not used as programming blocks
    



    /**
     * Authorize twitter account (requests a PIN through a browser window)
     */
    var tweetButton = new PushButtonMorph(
        null,
        function () {
            world.makers.twitter.requestPin(function(err, results) {
                if (!err) {
                    new world.makers.twitter.TwitterDialogMorph(
                        null,
                        // Function executed after pin is given by the user
                        function(pin) {
                            world.makers.twitter.processPin(pin, function(err, res) {
                                if (!err) {
                                    var msg = localize('Successful authorization for Twitter account')+' "'+res.screen_name+'".\n\n';
                                    msg += localize('You may now send tweets (on behalf of')+' "'+res.screen_name+'").'
                                    inform('Twitter', msg);
                                } else {
                                    inform('Twitter',"Authorization failed");
                                }
                            })
                        }
                    ).prompt(
                        "Twitter PIN",
                        localize('PIN number you get from browser page') ,
                        myself.world()
                    ); 
                } else {
                    inform('Twitter', "Could not connect to Twitter API, check Internet connectivity");
                }
            })

        },
        "Authorize Twitter Account"
    );


    SpriteMorph.prototype.blocks.makersAutoconnectArduino =
    {
        type: 'command',
        category: 'makers',
        spec: 'auto connect arduino'
    };

    SpriteMorph.prototype.blocks.makersDisConnectArduino =
    {
        type: 'command',
        category: 'makers',
        spec: 'disconnect arduino'
    };


    SpriteMorph.prototype.blocks.makersBuzzer =
    {
        type: 'command',
        category: 'makers',
        spec: 'buzzer at %buzzerval'
    };

    SpriteMorph.prototype.blocks.makersLedOn =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn on led %ledcolor'
    };

    SpriteMorph.prototype.blocks.makersLedOff =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn off led %ledcolor'
    };

    SpriteMorph.prototype.blocks.makersBuzzerOn =
    {
        type: 'command',
        category: 'makers',
        spec: 'buzzer on'
    };

    SpriteMorph.prototype.blocks.makersBuzzerOff =
    {
        type: 'command',
        category: 'makers',
        spec: 'buzzer off'
    };

    SpriteMorph.prototype.blocks.makersTemperature =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'temperature'
    };

    SpriteMorph.prototype.blocks.makersLight =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'light'
    };

    SpriteMorph.prototype.blocks.makersAudio =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'audio'
    };

    SpriteMorph.prototype.blocks.makersHumidity =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'humidity'
    };

    SpriteMorph.prototype.blocks.makersInfrared =
    {
        type: 'predicate',
        category: 'makers',
        spec: 'infrared'
    };

    SpriteMorph.prototype.blocks.makersPotentiometer =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'potentiometer'
    };
 
 
    SpriteMorph.prototype.blocks.makersSwitch =
    {
        type: 'predicate',
        category: 'makers',
        spec: 'switch'
    };
    
    SpriteMorph.prototype.blocks.makersTurnOnActuator =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn on pin %actuatorPin'
    };
    
    SpriteMorph.prototype.blocks.makersTurnOffActuator =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn off pin %actuatorPin'
    };

    SpriteMorph.prototype.blocks.makersSetPWM =
    {
        type: 'command',
        category: 'makers',
        spec: 'set pwn %pwmPin to %pwmValue'
    };
    
    SpriteMorph.prototype.blocks.makersReadSensor =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'read sensor %sensorPin'
    };
    
    
    // Redirects user to a web page (on local brower) for getting a PIN number from Twitter
    SpriteMorph.prototype.blocks.makersGetTwitterPin =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'get Tweeter pin'
    };

    SpriteMorph.prototype.blocks.makersSetTwitterPin =
    {
        type: 'command',
        category: 'makers',
        spec: 'set Tweeter pin %s'
    };

    SpriteMorph.prototype.blocks.makersSendTweet =
    {
        type: 'command',
        category: 'makers',
        spec: 'send Tweet %s'
    };

    // *this* will either be StageMorph or SpriteMorph
    var blocks = this.originalBlockTemplates_Makers(category); 

    function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }


    SpriteMorph.prototype.makersTemperature = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {
            var val;
            var pin = 0;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.temperatureLW35(val);
        } else {
            return null;
        }
    };

    SpriteMorph.prototype.makersLight = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var pin = 1;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.light(val);
        } else {
            return null;
        }

    };

    SpriteMorph.prototype.makersAudio = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var pin = 2;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.audio(val);
        } else {
            return null;
        }

    };

    SpriteMorph.prototype.makersHumidity = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var pin = 3;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.humidity(val);
        } else {
            return null;
        }

    };

    SpriteMorph.prototype.makersInfrared = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var pin = 4;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.infrared(val);
        } else {
            return null;
        }

    };

    SpriteMorph.prototype.makersPotentiometer = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var pin = 5;

            if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
                board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
            }
            val =  board.pins[board.analogPins[pin]].value;
            return world.makers.convertAnalogMeasure.potentiometer(val);
        } else {
            return null;
        }

    };

    SpriteMorph.prototype.makersSwitch = function () {
        var sprite = this;

        var board = sprite.arduino.board;
        if (sprite.makersIsBoardConnected()) {

            var val;
            var digitalPin = 2;

            val =  board.pins[digitalPin].value;
            return val === 1;
        } else {
            return null;
        }

    };
   

    if (category === 'makers') {
        blocks.push(blockBySelector('makersLedOn'));
        blocks.push(blockBySelector('makersLedOff'));
        blocks.push('-');
        blocks.push(blockBySelector('makersBuzzerOn'));
        blocks.push(blockBySelector('makersBuzzerOff'));
        blocks.push(blockBySelector('makersBuzzer'));
        blocks.push('-');
        blocks.push(watcherToggle('makersTemperature'));
        blocks.push(blockBySelector('makersTemperature'));
        blocks.push(watcherToggle('makersLight'));
        blocks.push(blockBySelector('makersLight'));
        blocks.push(watcherToggle('makersAudio'));
        blocks.push(blockBySelector('makersAudio'));
        blocks.push(watcherToggle('makersHumidity'));
        blocks.push(blockBySelector('makersHumidity'));
        blocks.push(watcherToggle('makersInfrared'));
        blocks.push(blockBySelector('makersInfrared'));
        blocks.push(watcherToggle('makersPotentiometer'));
        blocks.push(blockBySelector('makersPotentiometer'));
        blocks.push('-');
        blocks.push(watcherToggle('makersSwitch'));
        blocks.push(blockBySelector('makersSwitch'));
        blocks.push('-');
        blocks.push(blockBySelector('makersTurnOnActuator'));
        blocks.push(blockBySelector('makersTurnOffActuator'));
        blocks.push(blockBySelector('makersSetPWM'));
        blocks.push('-');
        blocks.push(blockBySelector('makersReadSensor'));
        blocks.push('-');
        blocks.push(tweetButton);
        blocks.push(blockBySelector('makersSendTweet'));

    }

    return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;
