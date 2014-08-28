function pinsSetToMode(aMode) {
	var sprite = world.children[0].currentSprite,
		board = sprite.arduino.board;

	var pinNumbers = {};
	var pins = board.pins;
	pins.forEach(
		function(each){ 
			if (each.mode == aMode) { 
				var number = pins.indexOf(each).toString(); 
				pinNumbers[number] = number;
			}
		}
	);
	return pinNumbers;
}


// labelPart() proxy

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

function overridenLabelPart(spec) {
	var part;
	switch (spec) {
		case '%port':
			part = new InputSlotMorph(
				null,
				false,
				function() {
					return world.arduino.portList;
				},
			   	true
				);
			break;
		case '%servoValue':
			part = new InputSlotMorph(
				null,
				false,
				{
					'angle (0-180)' : 90,
					'stopped' : ['stopped'] , 
					'clockwise' : ['clockwise'] ,
				 	'counter-clockwise' : ['counter-clockwise']
				}
				);
			part.setContents(['clockwise']);
			break;
		case '%pinMode':
			part = new InputSlotMorph(
				null,
				false,
				{
					'digital input' : ['digital input'],
					'digital output' : ['digital output'] ,
				 	'PWM' : ['PWM'] ,
				 	'servo' : ['servo']
				},
				true
				);
			part.setContents(['servo']);
			break;
		case '%servoPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { 
					// Get board associated to currentSprite
					var sprite = world.children[0].currentSprite,
					board = sprite.arduino.board;

			   		if (board) {
						return pinsSetToMode(board.MODES.SERVO);
					} else {
						return [];
					}
				},
				true
				);
			break;
		case '%pwmPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { 
					// Get board associated to currentSprite
					var sprite = world.children[0].currentSprite,
					board = sprite.arduino.board;

			   		if (board) {
						return pinsSetToMode(board.MODES.PWM);
					} else {
						return [];
					}
				},
				true
				);
			break;
		case '%analogPin':
            part = new InputSlotMorph(
                null,
                true,
				function() { 
					// Get board associated to currentSprite
					var sprite = world.children[0].currentSprite,
					board = sprite.arduino.board;

					if (board) { 
						return board.analogPins.map(function(each){ return (each - board.analogPins[0]).toString() });
					} else { 
						return [];
					} 
				},
				true
            );
            break;
		case '%digitalPin':
			part = new InputSlotMorph(
				null,
				true,
				function() {
					// Get board associated to currentSprite
					var sprite = world.children[0].currentSprite,
					board = sprite.arduino.board;

					if (board) {
						var pinNumbers = [];
						var pins = board.pins.filter(function(each){ return each.analogChannel == 127 });
						pins.forEach(function(each){ pinNumbers.push(pins.indexOf(each).toString()) });
						return pinNumbers;
					} else {
						return [];
					}
				},
				true
				);
			break;
		default:
			part = SyntaxElementMorph.prototype.originalLabelPart(spec);
		}
	return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart
