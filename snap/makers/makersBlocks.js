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

        case '%digitalPin':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '3':'3',
                    '8':'8',
                    '9':'9',
                    '10':'10',
                    '11':'11',
                    '12':'12'
                }
            );
            part.setContents('3');
            break;
        case '%motorSpinValue':
              part = new InputSlotMorph(
                null,
                true,
                {
                    'counter-clockwise':1,
                    'clockwise':0
                }
            );
            part.setContents('clockwise');
            break;
        case '%motorSpeedValue':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '0':0,
                    '50':50,
                    '100':100
                }
            );
            part.setContents('50');
            break;
        case '%servoPinV2':    
            part = new InputSlotMorph(
                null,
                true,
                {
                    'Primary':'Primary',
                    'D0':'D0',
                    'D1':'D1',
                    'D2':'D2',
                }
            );
            part.setContents('D0');
            break;
        case '%actuatorPinV2':    
            part = new InputSlotMorph(
                null,
                true,
                {
                    'D0':'D0',
                    'D1':'D1',
                    'D2':'D2'
                }
            );
            part.setContents('D0');
            break; 
         case '%pwmPinV2':    
            part = new InputSlotMorph(
                null,
                true,
                {
                    'D0':'D0',
                    'D1':'D1' 
                }
            );
            part.setContents('D0');
            break;         

        default:
            part = SyntaxElementMorph.prototype.originalLabelPart_Makers(spec);
        }
    return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart;


BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this,
        shiftClicked = world.currentKey === 16,
        proc = this.activeProcess(),
        vNames = proc ? proc.context.outerContext.variables.names() : [],
        alternatives,
        top,
        blck;

   /* menu.addItem(
        "help...",
        'showHelp'
    );*/
    if (shiftClicked) {
        top = this.topBlock();
        if (top instanceof ReporterBlockMorph) {
            menu.addItem(
                "script pic with result...",
                function () {
                    top.ExportResultPic();
                },
                'open a new window\n' +
                    'with a picture of both\nthis script and its result',
                new Color(100, 0, 0)
            );
        }
    }
    if (this.isTemplate) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            if (this.selector !== 'evaluateCustomBlock') {
                /*menu.addItem(
                    "hide",
                    'hidePrimitive'
                );*/
            }
            if (StageMorph.prototype.enableCodeMapping) {
                menu.addLine();
                menu.addItem(
                    'header mapping...',
                    'mapToHeader'
                );
                menu.addItem(
                    'code mapping...',
                    'mapToCode'
                );
            }
        }
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        blck = this.fullCopy();
        blck.addShadow();
        menu.addItem(
            'rename...',
            function () {
                new DialogBoxMorph(
                    myself,
                    myself.setSpec,
                    myself
                ).prompt(
                    "Variable name",
                    myself.blockSpec,
                    world,
                    blck.fullImage(), // pic
                    InputSlotMorph.prototype.getVarNamesDict.call(myself)
                );
            }
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            function () {
                myself.relabel(
                    SpriteMorph.prototype.blockAlternatives[myself.selector]
                );
            }
        );
    } else if (this.definition && this.alternatives) { // custom block
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                'relabel...',
                function () {myself.relabel(alternatives); }
            );
        }
    }

    menu.addItem(
        "duplicate",
        function () {
            var dup = myself.fullCopy(),
                ide = myself.parentThatIsA(IDE_Morph);
            dup.pickUp(world);
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            (proc ? this.fullCopy() : this).thumbnail(0.5, 60),
            function () {
                var cpy = myself.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = myself.parentThatIsA(IDE_Morph);
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            },
            'only duplicate this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    menu.addItem(
        "script pic...",
        'savePic',
        'open a new window\nwith a picture of this script'
    );
    if (proc) {
        if (vNames.length) {
            menu.addLine();
            vNames.forEach(function (vn) {
                menu.addItem(
                    vn + '...',
                    function () {
                        proc.doShowVar(vn);
                    }
                );
            });
        }
        return menu;
    }
    if (this.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        menu.addItem("ringify", 'ringify');
        return menu;
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (this.topBlock() instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", 'ringify');
    if (StageMorph.prototype.enableCodeMapping) {
        menu.addLine();
        menu.addItem(
            'header mapping...',
            'mapToHeader'
        );
        menu.addItem(
            'code mapping...',
            'mapToCode'
        );
    }
    return menu;
};

BlockMorph.prototype.savePic= function(){
    IDE_Morph.prototype.savePic(this.topBlock().scriptPic().toDataURL());
}