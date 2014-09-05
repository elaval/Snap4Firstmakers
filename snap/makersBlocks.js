'use strict';

SyntaxElementMorph.prototype.originalLabelPart_Makers = SyntaxElementMorph.prototype.labelPart;

function overridenLabelPart(spec) {
    var part;
    switch (spec) {
        case '%buzzerval':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '0' : 0,
                    '50' : 50,
                    '100' : 100
                }
            );
            part.setContents(50);
            break;

        case '%ledcolor':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'white (w)':'w',
                    'red (r)': 'r',
                    'yellow (y)': 'y',
                    'green (g)': 'g'
                }
            );
            part.setContents('w');
            break;

        case '%actuatorPin':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '3':3,
                    '8':8,
                    '9':9,
                    '10':10,
                    '11':11,
                    '12':12
                }
            );
            part.setContents(12);
            break;

        case '%pwmPin':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '3':3,
                    '9':9,
                    '10':10,
                    '11':11
                }
            );
            part.setContents(3);
            break;

        case '%pwmValue':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '0':0,
                    '50':50,
                    '100':100
                }
            );
            part.setContents(100);
            break;

        case '%sensorPin':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'A0':'A0',
                    'A1':'A1',
                    'A2':'A2',
                    'A3':'A3',
                    'A4':'A4',
                    'A5':'A5'
                }
            );
            part.setContents('A0');
            break;


        default:
            part = SyntaxElementMorph.prototype.originalLabelPart_Makers(spec);
        }
    return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart;