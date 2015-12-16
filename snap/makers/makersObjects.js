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
        //'sensing',
        'utilities',
        'sound',
        'operators',
        'pen',
        'variables',
        'lists',
        //'arduino',
        'makers',
        'other',
        'internet'
    ];



SpriteMorph.prototype.blockColor = {
    motion : new Color(74, 108, 212),
    looks : new Color(143, 86, 227),
    sound : new Color(207, 74, 217),
    pen : new Color(0, 161, 120),
    control : new Color(230, 168, 34),
    utilities : new Color(4, 148, 220),
    sensing : new Color(4, 148, 220),
    operators : new Color(98, 194, 19),
    variables : new Color(243, 118, 29),
    lists : new Color(217, 77, 17),
    arduino: new Color(64, 136, 182),
    makers : new Color(64, 64, 230),
    other: new Color(150, 150, 150),
    internet: new Color(150, 150, 150)
};


SpriteMorph.prototype.originalSnap4ArduinoInitBlocks = SpriteMorph.prototype.initBlocks;

SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype.originalSnap4ArduinoInitBlocks();



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
        spec: 'set pwm %pwmPin to %pwmValue'
    };
    SpriteMorph.prototype.blocks.makersSetPWMV2 =
    {
        type: 'command',
        category: 'makers',
        spec: 'set pwm %pwmPinV2 to %pwmValue'
    };
    
    SpriteMorph.prototype.blocks.makersReadSensor =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'read analog %sensorPin'
    };
    
    SpriteMorph.prototype.blocks.makersReportDigitalPin =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'read digital %digitalPin'
    };
    
    SpriteMorph.prototype.blocks.makersReportDigitalPinV2 =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'read digital %actuatorPinV2'
    };
    
    SpriteMorph.prototype.blocks.makersServoWrite =
    {
        type: 'command',
        category: 'makers',
        spec: 'servo %digitalPin to %servoValue',
        defaults: [null, 'clockwise']
    };
    
    SpriteMorph.prototype.blocks.makersServoWriteV2 =
    {
        type: 'command',
        category: 'makers',
        spec: 'servo to %servoValue',
        defaults: ['clockwise']
    };
    
    SpriteMorph.prototype.blocks.makersMotor =
    {
        type: 'command',
        category: 'makers',
        spec: 'motor spin %motorSpinValue speed %motorSpeedValue',
        defaults: ['0','50']
    };
    SpriteMorph.prototype.blocks.outputDigitalOn =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn on pin %actuatorPinV2',
        defaults: ['D0']
    };
    
    SpriteMorph.prototype.blocks.outputDigitalOff =
    {
        type: 'command',
        category: 'makers',
        spec: 'turn off pin %actuatorPinV2',
        defaults: ['D0']
    };
    
    
    // Redirects user to a web page (on local brower) for getting a PIN number from Twitter
    SpriteMorph.prototype.blocks.makersGetTwitterPin =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'get Twitter pin'
    };

    /**
     * Internet category blocks blocks
     */ 
    SpriteMorph.prototype.blocks.makersSetTwitterPin =
    {
        type: 'command',
        category: 'internet',
        spec: 'set Twitter pin %s'
    };

    SpriteMorph.prototype.blocks.makersSendTweet =
    {
        type: 'command',
        category: 'internet',
        spec: 'send Tweet %s'
    };

    SpriteMorph.prototype.blocks.reportURL = 
    {
            type: 'reporter',
            category: 'internet',
            spec: 'http:// %s',
            defaults: ['snap.berkeley.edu']
    };

    SpriteMorph.prototype.blocks.reportWeather = 
    {
            type: 'reporter',
            category: 'internet',
            spec: 'temperature in %s',
            defaults: ['London,UK']
    };

    SpriteMorph.prototype.blocks.reportXively = 
    {
            type: 'reporter',
            category: 'internet',
            spec: 'xively read datastream %s from feed %s with key %s',
            defaults: ['582358762','temperature', '4Q2cTD5DAkjFtFVqoi7zrKdwNchYDoPSKVrcoqSAU5OvzdnV']
    };

    SpriteMorph.prototype.blocks.reportThingSpeak = 
    {
            type: 'reporter',
            category: 'internet',
            spec: 'thingspeak read field %s from channel %s with key %s',
            defaults: ['1']
    };

   SpriteMorph.prototype.blocks.updateThingSpeak = 
    {
            type: 'command',
            category: 'internet',
            spec: 'thingspeak set value %s at field %s in channel %s with key %s',
            defaults: ['0','1']
    };
    
    SpriteMorph.prototype.blocks.gotoInitial = 
    {
            type: 'command',
            category: 'motion',
            spec:'Go to initial position'   
    };



}
SpriteMorph.prototype.initBlocks();


// Definition of our new primitive blocks
function overridenBlockTemplates(category) {
    var myself = this,
        blocks = [],
        varNames,
        button;

    var myself = this;

    if (!this.arduino) {
        this.arduino = {
            board : undefined,      // Reference to arduino board - to be created by new firmata.Board()
            connecting : false,     // Mark to avoid multiple attempts to connect
            justconnected: false,   // Mark to avoid double attempts
        };
    }

    //var variableWatcherToggle = SpriteMorph.prototype.originalBlockTemplates_Makers.variableWatcherToggle;

    function variableBlock(varName) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName);
        newBlock.isDraggable = false;
        newBlock.isTemplate = true;
        return newBlock;
    }
    
   function watcherToggle(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];
        var toggle = new ToggleMorph(
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
       return toggle;
    }

    function variableWatcherToggle(varName) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName);
            },
            null
        );
    }

    function helpMenu() {
        var menu = new MenuMorph(this);
        menu.addItem('help...', 'showHelp');
        return menu;
    }

    // Button definitions
    // Buttons are push buttons displayed in the block group area
    // which can trigger actions but are not used as programming blocks
    

    /**
     *  Button that triggers a connection attempt 
     */
    var arduinoConnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.attemptConnection();
            },
            'Connect Arduino'
    );

    /**
     * Button that triggers a disconnection from board
     */
    var arduinoDisconnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.disconnect();;
            },
            'Disconnect Arduino'
    );

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


    // *this* will either be StageMorph or SpriteMorph
    //var blocks = this.originalBlockTemplates_Makers(category); 

    function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    function block(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
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
    /**reset sprite to initial position 0,0*/
    SpriteMorph.prototype.gotoInitial= function(){
        this.gotoXY(0,0,true);
        this.setHeading(90);
        
    }


    if (category === 'motion') {
        if (world.isMakersBasicMode) {
            blocks.push(block('gotoInitial'));
            blocks.push(block('forward'));
            blocks.push(block('turn'));
            blocks.push(block('turnLeft'));
            blocks.push('-');
            blocks.push(block('setHeading'));
            blocks.push('-');
            blocks.push(block('changeXPosition'));
            blocks.push(block('setXPosition'));
            blocks.push(block('changeYPosition'));
            blocks.push(block('setYPosition'));
        } else  {
            blocks.push(block('gotoInitial'));
            blocks.push(block('forward'));
            blocks.push(block('turn'));
            blocks.push(block('turnLeft'));
            blocks.push('-');
            blocks.push(block('setHeading'));
            blocks.push(block('doFaceTowards'));
            blocks.push('-');
            blocks.push(block('gotoXY'));
            blocks.push(block('doGotoObject'));
            blocks.push(block('doGlide'));
            blocks.push('-');
            blocks.push(block('changeXPosition'));
            blocks.push(block('setXPosition'));
            blocks.push(block('changeYPosition'));
            blocks.push(block('setYPosition'));
            blocks.push('-');
            blocks.push(block('bounceOffEdge'));
            blocks.push('-');
            blocks.push(watcherToggle('xPosition'));
            blocks.push(block('xPosition'));
            blocks.push(watcherToggle('yPosition'));
            blocks.push(block('yPosition'));
            blocks.push(watcherToggle('direction'));
            blocks.push(block('direction'));
        }

    } else if (category === 'looks') {
        if (world.isMakersBasicMode) {
            blocks.push(block('doSwitchToCostume'));
            blocks.push('-');
            blocks.push(block('setScale'));   
            blocks.push(watcherToggle('getScale'));
            blocks.push(block('getScale'));
            blocks.push('-');
            blocks.push(block('bubble'));
            blocks.push('-');
            blocks.push(block('show'));
            blocks.push(block('hide'));

        } else  {
            blocks.push(block('doSwitchToCostume'));
            blocks.push(block('doWearNextCostume'));
            blocks.push(watcherToggle('getCostumeIdx'));
            blocks.push(block('getCostumeIdx'));
            blocks.push('-');
            blocks.push(block('doSayFor'));
            blocks.push(block('bubble'));
            blocks.push(block('doThinkFor'));
            blocks.push(block('doThink'));
            blocks.push('-');
            blocks.push(block('changeEffect'));
            blocks.push(block('setEffect'));
            blocks.push(block('clearEffects'));
            blocks.push(block('changeScale'));
            blocks.push(block('setScale'));   
            blocks.push(watcherToggle('getScale'));
            blocks.push(block('getScale'));
            blocks.push('-');
            blocks.push(block('show'));
            blocks.push(block('hide'));
            blocks.push('-');
            blocks.push(block('comeToFront'));
            blocks.push(block('goBack'));
        }

    // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportCostumes'));
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    /////////////////////////////////

    } else if (category === 'sound') {
        if (world.isMakersBasicMode) {
            blocks.push(block('playSound'));
            blocks.push(block('doStopAllSounds'));
            blocks.push('-');
            blocks.push(block('doPlayNote'));
        } else  {
            blocks.push(block('playSound'));
            blocks.push(block('doPlaySoundUntilDone'));
            blocks.push(block('doStopAllSounds'));
            blocks.push('-');
            blocks.push(block('doRest'));
            blocks.push('-');
            blocks.push(block('doPlayNote'));
            blocks.push('-');
            blocks.push(block('doChangeTempo'));
            blocks.push(block('doSetTempo'));
            blocks.push(watcherToggle('getTempo'));
            blocks.push(block('getTempo'));
        }
 


    // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportSounds'));
        }

    } else if (category === 'pen') {
        if (world.isMakersBasicMode) {
            blocks.push(block('clear'));
            blocks.push('-');
            blocks.push(block('down'));
            blocks.push(block('up'));
            blocks.push('-');
            blocks.push(block('setColor'));
            blocks.push('-');
            blocks.push(block('setSize'));
        } else  {
            blocks.push(block('clear'));
            blocks.push('-');
            blocks.push(block('down'));
            blocks.push(block('up'));
            blocks.push('-');
            blocks.push(block('setColor'));
            blocks.push(block('changeHue'));
            blocks.push(block('setHue'));
            blocks.push('-');
            blocks.push(block('changeBrightness'));
            blocks.push(block('setBrightness'));
            blocks.push('-');
            blocks.push(block('changeSize'));
            blocks.push(block('setSize'));
            blocks.push('-');
            blocks.push(block('doStamp'));
        }



    } else if (category === 'control') {
        if (world.isMakersBasicMode) {
            blocks.push(block('receiveGo'));
            blocks.push(block('receiveKey'));
            blocks.push(block('receiveClick'));
            blocks.push(block('receiveMessage'));
            blocks.push('-');
            blocks.push(block('doBroadcast'));            
            blocks.push(block('doWait'));
            blocks.push('-');           
            blocks.push(block('doForever'));
            blocks.push(block('doUntil'));
            blocks.push('-');
            blocks.push(block('doIf'));
            blocks.push(block('doIfElse'));
        } else {
            blocks.push(block('receiveGo'));
            blocks.push(block('receiveKey'));
            blocks.push(block('receiveClick'));
            blocks.push(block('receiveMessage'));
            blocks.push('-');
            blocks.push(block('doBroadcast'));
            blocks.push(block('doBroadcastAndWait'));
            blocks.push(watcherToggle('getLastMessage'));
            blocks.push(block('getLastMessage'));
            
            blocks.push('-');
            blocks.push(block('doWarp'));
            blocks.push('-');
            blocks.push(block('doWait'));
            blocks.push(block('doWaitUntil'));
            blocks.push('-');
            
            blocks.push(block('doForever'));
            blocks.push(block('doRepeat'));
            blocks.push(block('doUntil'));
            blocks.push('-');
            blocks.push(block('doIf'));
            blocks.push(block('doIfElse'));
            blocks.push('-');
            blocks.push(block('doReport'));
            blocks.push('-');
            blocks.push(block('doStopThis'));
            blocks.push(block('doStopOthers'));
            blocks.push('-');
            blocks.push(block('doRun'));
            blocks.push(block('fork'));
            blocks.push(block('evaluate'));
            blocks.push('-');
            blocks.push(block('doCallCC'));
            blocks.push(block('reportCallCC'));
            blocks.push('-');
            blocks.push(block('receiveOnClone'));
            blocks.push(block('createClone'));
            blocks.push(block('removeClone'));
            blocks.push('-');
            blocks.push(block('doPauseAll'));
        }

    } else if (category === 'utilities') {
        if (world.isMakersBasicMode) {
            blocks.push(watcherToggle('reportMouseX'));
            blocks.push(block('reportMouseX'));
            blocks.push(watcherToggle('reportMouseY'));
            blocks.push(block('reportMouseY'));
            blocks.push(block('reportMouseDown'));
            blocks.push('-');
            blocks.push(block('reportKeyPressed'));
            blocks.push('-');
            blocks.push(block('reportDate'));
        } else {
            blocks.push(block('reportTouchingObject'));
            blocks.push(block('reportTouchingColor'));
            blocks.push(block('reportColorIsTouchingColor'));
            blocks.push('-');
            blocks.push(block('doAsk'));
            blocks.push(watcherToggle('getLastAnswer'));
            blocks.push(block('getLastAnswer'));
            blocks.push('-');
            blocks.push(watcherToggle('reportMouseX'));
            blocks.push(block('reportMouseX'));
            blocks.push(watcherToggle('reportMouseY'));
            blocks.push(block('reportMouseY'));
            blocks.push(block('reportMouseDown'));
            blocks.push('-');
            blocks.push(block('reportKeyPressed'));
            blocks.push('-');
            blocks.push(block('reportDistanceTo'));
            blocks.push('-');
            blocks.push(block('doResetTimer'));
            blocks.push(watcherToggle('getTimer'));
            blocks.push(block('getTimer'));
            blocks.push('-');
            blocks.push(block('reportAttributeOf'));
            blocks.push('-');
            blocks.push(block('reportURL'));
            blocks.push('-');
            blocks.push(block('reportIsFastTracking'));
            blocks.push(block('doSetFastTracking'));
            blocks.push('-');
            blocks.push(block('reportDate'));
        }


 

    // for debugging: ///////////////

        if (this.world().isDevMode) {

            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('colorFiltered'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
        }

    } else if (category === 'operators') {
        if (world.isMakersBasicMode) {
            blocks.push(block('reportSum'));
            blocks.push(block('reportDifference'));
            blocks.push(block('reportProduct'));
            blocks.push(block('reportQuotient'));
            blocks.push('-');
            blocks.push(block('reportModulus'));
            blocks.push(block('reportRound'));
            blocks.push(block('reportMonadic'));
            blocks.push(block('reportRandom'));
            blocks.push('-');
            blocks.push(block('reportLessThan'));
            blocks.push(block('reportEquals'));
            blocks.push(block('reportGreaterThan'));
            blocks.push('-');
            blocks.push(block('reportAnd'));
            blocks.push(block('reportOr'));
            blocks.push(block('reportNot'));
            blocks.push('-');
            blocks.push(block('reportTrue'));
            blocks.push(block('reportFalse'));
            blocks.push('-');
            blocks.push(block('reportJoinWords'));
        } else {
            blocks.push(block('reifyScript'));
            blocks.push(block('reifyReporter'));
            blocks.push(block('reifyPredicate'));
            blocks.push('#');
            blocks.push('-');
            blocks.push(block('reportSum'));
            blocks.push(block('reportDifference'));
            blocks.push(block('reportProduct'));
            blocks.push(block('reportQuotient'));
            blocks.push('-');
            blocks.push(block('reportModulus'));
            blocks.push(block('reportRound'));
            blocks.push(block('reportMonadic'));
            blocks.push(block('reportRandom'));
            blocks.push('-');
            blocks.push(block('reportLessThan'));
            blocks.push(block('reportEquals'));
            blocks.push(block('reportGreaterThan'));
            blocks.push('-');
            blocks.push(block('reportAnd'));
            blocks.push(block('reportOr'));
            blocks.push(block('reportNot'));
            blocks.push('-');
            blocks.push(block('reportTrue'));
            blocks.push(block('reportFalse'));
            blocks.push('-');
            blocks.push(block('reportJoinWords'));
            blocks.push(block('reportTextSplit'));
            blocks.push(block('reportLetter'));
            blocks.push(block('reportStringSize'));
            blocks.push('-');
            blocks.push(block('reportUnicode'));
            blocks.push(block('reportUnicodeAsLetter'));
            blocks.push('-');
            blocks.push(block('reportIsA'));
            blocks.push(block('reportIsIdentical'));
            blocks.push('-');
            blocks.push(block('reportJSFunction'));
        }




    // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(
                'development mode \ndebugging primitives:'
            );
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    /////////////////////////////////

    } else if (category === 'variables') {

        if (world.isMakersBasicMode) {
            button = new PushButtonMorph(
                null,
                function () {
                    new VariableDialogMorph(
                        null,
                        function (pair) {
                            if (pair && !myself.variables.silentFind(pair[0])) {
                                myself.addVariable(pair[0], pair[1]);
                                myself.toggleVariableWatcher(pair[0], pair[1]);
                                myself.blocksCache[category] = null;
                                myself.paletteCache[category] = null;
                                myself.parentThatIsA(IDE_Morph).refreshPalette();
                            }
                        },
                        myself
                    ).prompt(
                        'Variable name',
                        null,
                        myself.world()
                    );
                },
                'Make a variable'
            );
            button.userMenu = helpMenu;
            button.selector = 'addVariable';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);

            if (this.variables.allNames().length > 0) {
                button = new PushButtonMorph(
                    null,
                    function () {
                        var menu = new MenuMorph(
                            myself.deleteVariable,
                            null,
                            myself
                        );
                        myself.variables.allNames().forEach(function (name) {
                            menu.addItem(name, name);
                        });
                        menu.popUpAtHand(myself.world());
                    },
                    'Delete a variable'
                );
                button.userMenu = helpMenu;
                button.selector = 'deleteVariable';
                button.showHelp = BlockMorph.prototype.showHelp;
                blocks.push(button);
            }

            blocks.push('-');

            varNames = this.variables.allNames();
            if (varNames.length > 0) {
                varNames.forEach(function (name) {
                    blocks.push(variableWatcherToggle(name));
                    blocks.push(variableBlock(name));
                });
                blocks.push('-');
            }

            blocks.push(block('doSetVar'));
            blocks.push(block('doChangeVar'));
            blocks.push(block('doShowVar'));
            blocks.push(block('doHideVar'));
        } else {
            button = new PushButtonMorph(
                null,
                function () {
                    new VariableDialogMorph(
                        null,
                        function (pair) {
                            if (pair && !myself.variables.silentFind(pair[0])) {
                                myself.addVariable(pair[0], pair[1]);
                                myself.toggleVariableWatcher(pair[0], pair[1]);
                                myself.blocksCache[category] = null;
                                myself.paletteCache[category] = null;
                                myself.parentThatIsA(IDE_Morph).refreshPalette();
                            }
                        },
                        myself
                    ).prompt(
                        'Variable name',
                        null,
                        myself.world()
                    );
                },
                'Make a variable'
            );
            button.userMenu = helpMenu;
            button.selector = 'addVariable';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);

            if (this.variables.allNames().length > 0) {
                button = new PushButtonMorph(
                    null,
                    function () {
                        var menu = new MenuMorph(
                            myself.deleteVariable,
                            null,
                            myself
                        );
                        myself.variables.allNames().forEach(function (name) {
                            menu.addItem(name, name);
                        });
                        menu.popUpAtHand(myself.world());
                    },
                    'Delete a variable'
                );
                button.userMenu = helpMenu;
                button.selector = 'deleteVariable';
                button.showHelp = BlockMorph.prototype.showHelp;
                blocks.push(button);
            }

            blocks.push('-');

            varNames = this.variables.allNames();
            if (varNames.length > 0) {
                varNames.forEach(function (name) {
                    blocks.push(variableWatcherToggle(name));
                    blocks.push(variableBlock(name));
                });
                blocks.push('-');
            }

            blocks.push(block('doSetVar'));
            blocks.push(block('doChangeVar'));
            blocks.push(block('doShowVar'));
            blocks.push(block('doHideVar'));
            blocks.push(block('doDeclareVariables'));

            blocks.push('=');

            blocks.push(block('reportNewList'));
            blocks.push('-');
            blocks.push(block('reportCONS'));
            blocks.push(block('reportListItem'));
            blocks.push(block('reportCDR'));
            blocks.push('-');
            blocks.push(block('reportListLength'));
            blocks.push(block('reportListContainsItem'));
            blocks.push('-');
            blocks.push(block('doAddToList'));
            blocks.push(block('doDeleteFromList'));
            blocks.push(block('doInsertInList'));
            blocks.push(block('doReplaceInList'));
        }




    // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportMap'));
        }

    /////////////////////////////////

        if (world.isMakersBasicMode) {

        } else {
            blocks.push('=');

            if (StageMorph.prototype.enableCodeMapping) {
                blocks.push(block('doMapCodeOrHeader'));
                blocks.push(block('doMapStringCode'));
                blocks.push(block('doMapListCode'));
                blocks.push('-');
                blocks.push(block('reportMappedCode'));
                blocks.push('=');
            }

            button = new PushButtonMorph(
                null,
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph),
                        stage = myself.parentThatIsA(StageMorph);
                    new BlockDialogMorph(
                        null,
                        function (definition) {
                            if (definition.spec !== '') {
                                if (definition.isGlobal) {
                                    stage.globalBlocks.push(definition);
                                } else {
                                    myself.customBlocks.push(definition);
                                }
                                ide.flushPaletteCache();
                                ide.refreshPalette();
                                new BlockEditorMorph(definition, myself).popUp();
                            }
                        },
                        myself
                    ).prompt(
                        'Make a block',
                        null,
                        myself.world()
                    );
                },
                'Make a block'
            );
            button.userMenu = helpMenu;
            button.selector = 'addCustomBlock';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);
        }

    } else if (category === 'makers') {
        blocks.push(arduinoConnectButton);
        blocks.push(arduinoDisconnectButton);
        blocks.push('-');
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
        blocks.push(blockBySelector('makersReadSensor'));
        if(world.isMakersV2){
            //bloques makers para la tarjeta version 2 
            blocks.push(blockBySelector('makersReportDigitalPinV2'));
            blocks.push(blockBySelector('makersSetPWMV2'));
            blocks.push(blockBySelector('outputDigitalOn'));
            blocks.push(blockBySelector('outputDigitalOff'));
            blocks.push('-');
            blocks.push(blockBySelector('makersServoWriteV2'));
            blocks.push(blockBySelector('makersMotor'));
            
        }else{
            
            blocks.push(blockBySelector('makersReportDigitalPin'));
            blocks.push(blockBySelector('makersTurnOnActuator'));
            blocks.push(blockBySelector('makersSetPWM'));
            blocks.push(blockBySelector('makersTurnOffActuator'));
            blocks.push('-');
            blocks.push(blockBySelector('makersServoWrite'));
        }

    } else if (category === 'internet') {
        blocks.push('-');
        blocks.push(tweetButton);
        blocks.push(blockBySelector('makersSendTweet'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push('-');
        blocks.push(block('reportWeather'));
        blocks.push('-');

        if (!world.isMakersBasicMode) {
            blocks.push(block('reportXively'));
            blocks.push('-');
            blocks.push(block('reportThingSpeak'));
            blocks.push(block('updateThingSpeak'));
        } 
    }

    return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;

SpriteMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this);

    if (ide && ide.isAppMode) {
        // menu.addItem('help', 'nop');
        return menu;
    }
    menu.addItem("duplicate", 'duplicate');
    menu.addItem("delete", 'remove');
    menu.addItem("move", 'moveCenter');
    /*if (!this.isClone) {
        menu.addItem("edit", 'edit');
    }*/
    menu.addLine();
    if (this.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.anchor.name,
            'detachFromAnchor'
        );
    }
    if (this.parts.length) {
        menu.addItem('detach all parts', 'detachAllParts');
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

