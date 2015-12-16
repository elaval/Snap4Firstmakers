
// Makers logo

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();
    var path='makers'+MakerApp.systemSlash+'images'+MakerApp.systemSlash+'fmlogo.png';
    this.logo.texture = path; // Overriden
    this.logo.drawNew = function () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d');
            /*gradient = context.createLinearGradient(
                0,
                0,
                this.width(),
                0
            );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        context.fillStyle = MorphicPreferences.isFlat ?
                myself.frameColor.toString() : gradient;*/
        context.fillStyle = myself.frameColor.toString();
        context.fillRect(0, 0, this.width(), this.height());
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };

    this.logo.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = new Color();
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

/**
 * Override setLanguage function for s4a & makers
 */
IDE_Morph.prototype.setLanguage = function(lang, callback) {
    var myself = this;

    myself.originalSetLanguage(lang, function() {
        myself.setLanguageS4A(lang, function() {
            myself.setLanguageMakers(lang, callback);
        });
    });
};


IDE_Morph.prototype.setLanguageMakers = function (lang, callback) {
    // Load language script for makers related functions

    var makers_translation = document.getElementById('makers-language'),
        makers_src = 'makers'+MakerApp.systemSlash+'lang'+MakerApp.systemSlash+'makers-lang-' + lang + '.js',
        myself = this;
    //SnapTranslator.unload();
    if (makers_translation) {
        document.head.removeChild(makers_translation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    makers_translation = document.createElement('script');
    makers_translation.id = 'makers-language';
    makers_translation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(makers_translation);
    makers_translation.src = makers_src;
};

// Modify settings menu to add basic/advanced mode for makers
IDE_Morph.prototype.originalSnap4ArduinoSettingsMenu = IDE_Morph.prototype.settingsMenu;

IDE_Morph.prototype.settingsMenu = function () {
    var menu,
        stage = this.stage,
        world = this.world(),
        myself = this,
        pos = this.controlBar.settingsButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16);

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        var on = '\u2611 ',
            off = '\u2610 ';
        if (!hide || shiftClicked) {
            menu.addItem(
                (test ? on : off) + localize(label),
                toggle,
                test ? onHint : offHint,
                hide ? new Color(100, 0, 0) : null
            );
        }
    }

    this.originalSnap4ArduinoSettingsMenu();

    menu = world.activeMenu;

    menu.addLine();

    addPreference(
        'Makers basic mode',
        function () {
            world.isMakersBasicMode = !world.isMakersBasicMode; 
            myself.saveSetting('makersBasicMode', world.isMakersBasicMode);
            myself.refreshIDE();
        },
        world.isMakersBasicMode,
        'uncheck to advanced mode (more block options)',
        'check to enable basic mode (reduced block options)'
    );
    addPreference(
        'FirstMakers v2.0 compatible',
        function () {
            world.isMakersV2 = !world.isMakersV2; 
            myself.saveSetting('makersV2', world.isMakersV2);
            myself.refreshIDE();
        },
        world.isMakersV2,
        'uncheck to work with older versions of the board',
        'check to work with version 2.0 of the board'
    );

    menu.popup(world, pos);
};


IDE_Morph.prototype.originalaSnap4ArduionoApplySavedSettings = 
IDE_Morph.prototype.applySavedSettings;

IDE_Morph.prototype.applySavedSettings = function() {

    this.originalaSnap4ArduionoApplySavedSettings();

    var makersBasicMode = this.getSetting('makersBasicMode'),
    //makersV1 = this.getSetting('makersV1'),
    makersV2 = this.getSetting('makersV2'),
    language = this.getSetting('language');

    // localstorage (and getSetting) gets boolean values as string, so a "false" value is not false.
    // we use the trick JSON.parse(this.getSetting["x"]) to convet "false" into false and "true" into true
    if (typeof makersBasicMode == "string" && makersBasicMode) {
        world.isMakersBasicMode = makersBasicMode == "true" ? true : false;
    } else if (typeof makersBasicMode == "boolean") {
        world.isMakersBasicMode = makersBasicMode
    } else {
        world.isMakersBasicMode = false;  //default 
    }
    if (typeof makersV2 !== "undefined" && makersV2) {
        world.isMakersV2 = makersV2 == "true" ? true : false;
    } else if (typeof makersV2 == "boolean") {
        world.isMakersV2 = isMakersV2;
    } else {
        world.isMakersV2 = false; // default
    }
    
    //Init in spanish
    if (language && language !== 'es') {
        this.userLanguage = language;
    } else {
        this.userLanguage = 'es'//default;
    }
}



IDE_Morph.prototype.originalSnap4Arduinoinit =  IDE_Morph.prototype.init;

IDE_Morph.prototype.init = function (isAutoFill) {
    this.originalSnap4Arduinoinit(isAutoFill);

    this.currentCategory = 'makers';
}


IDE_Morph.prototype.snapMenu = function () {
    var menu,
    world = this.world();

    menu = new MenuMorph(this);
    menu.addItem('About Snap!...', 'aboutSnap');
    menu.addItem('About FirstMakers...', 'aboutFirstMakers');
    menu.addLine();

    menu.addItem(
        'FirstMakers website',
        function () {
            var gui = require('nw.gui');
            // Open URL with default browser.
            gui.Shell.openExternal('http://www.firstmakers.com');
    
        }
    );
    menu.addItem(
        'Download source code',
        function () {
            var gui = require('nw.gui');
            // Open URL with default browser.
            gui.Shell.openExternal('https://github.com/elaval/Snap4Firstmakers');
        }
    );


    if (world.isDevMode) {
        menu.addLine();
        menu.addItem(
            'Switch back to user mode',
            'switchToUserMode',
            'disable deep-Morphic\ncontext menus'
            + '\nand show user-friendly ones',
            new Color(0, 100, 0)
            );
    } else if (world.currentKey === 16) { // shift-click
        menu.addLine();
        menu.addItem(
            'Switch to dev mode',
            'switchToDevMode',
            'enable Morphic\ncontext menus\nand inspectors,'
            + '\nnot user-friendly!',
            new Color(100, 0, 0)
        );
    }
    menu.popup(world, this.logo.bottomLeft());
};
IDE_Morph.prototype.aboutFirstMakers = function () {
    var dlg, aboutTxt, creditsTxt, translations,
    module, aboutBtn, creditsBtn,
    world = this.world();

    aboutTxt = localize('Snap4Firstmakers! 1.0.2-beta\n\n Is a modification of Snap4Arduino Software for controlling FirstMakers Board');

    creditsTxt = localize('Contributors\n\nErnesto Laval: MacOSX version, architectural decisions,\nseveral features and bugfixes, Spanish translation\nJose Saavedra: Hardware Desing\nEdison Delgado: Software engineering\n');

    dlg = new DialogBoxMorph();
    dlg.inform('About Snap4Firstmakers', aboutTxt, world);
    creditsBtn = dlg.addButton(
        function () {
            dlg.body.text = creditsTxt;
            dlg.body.drawNew();
            aboutBtn.show();
            creditsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        'Contributions...'
    );
    aboutBtn = dlg.addButton(
        function () {
            dlg.body.text = aboutTxt;
            dlg.body.drawNew();
            aboutBtn.hide();
            creditsBtn.show();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        'About Snap4FirstMakers...'
    );
    aboutBtn.hide();
    dlg.fixLayout();
    dlg.drawNew();
};
IDE_Morph.prototype.cloudMenu = function () {
    return;
};
IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
        button,
        stopButton,
        pauseButton,
        startButton,
        projectButton,
        settingsButton,
        stageSizeButton,
        appModeButton,
        /*cloudButton,*/
        x,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ],
        myself = this;

    if (this.controlBar) {
        this.controlBar.destroy();
    }

    this.controlBar = new Morph();
    this.controlBar.color = this.frameColor;
    this.controlBar.setHeight(this.logo.height()); // height is fixed
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };
    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleStageSize',
        [
            new SymbolMorph('smallStage', 14),
            new SymbolMorph('normalStage', 14)
        ],
        function () {  // query
            return myself.isSmallStage;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stage size\nsmall & normal';
    button.fixLayout();
    button.refresh();
    stageSizeButton = button;
    this.controlBar.add(stageSizeButton);
    this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleAppMode',
        [
            new SymbolMorph('fullScreen', 14),
            new SymbolMorph('normalScreen', 14)
        ],
        function () {  // query
            return myself.isAppMode;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'app & edit\nmodes';
    button.fixLayout();
    button.refresh();
    appModeButton = button;
    this.controlBar.add(appModeButton);
    this.controlBar.appModeButton = appModeButton; // for refreshing

    // stopButton
    button = new PushButtonMorph(
        this,
        'stopAllScripts',
        new SymbolMorph('octagon', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(200, 0, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    stopButton = button;
    this.controlBar.add(stopButton);

    //pauseButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'togglePauseResume',
        [
            new SymbolMorph('pause', 12),
            new SymbolMorph('pointRight', 14)
        ],
        function () {  // query
            return myself.isPaused();
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'pause/resume\nall scripts';
    button.fixLayout();
    button.refresh();
    pauseButton = button;
    this.controlBar.add(pauseButton);
    this.controlBar.pauseButton = pauseButton; // for refreshing

    // startButton
    button = new PushButtonMorph(
        this,
        'pressStart',
        new SymbolMorph('flag', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(0, 200, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    startButton = button;
    this.controlBar.add(startButton);
    this.controlBar.startButton = startButton;

    // projectButton
    button = new PushButtonMorph(
        this,
        'projectMenu',
        new SymbolMorph('file', 14)
        //'\u270E'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
        this,
        'settingsMenu',
        new SymbolMorph('gears', 14)
        //'\u2699'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'edit settings';
    button.fixLayout();
    settingsButton = button;
    this.controlBar.add(settingsButton);
    this.controlBar.settingsButton = settingsButton; // for menu positioning

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
        [stopButton, pauseButton, startButton].forEach(
            function (button) {
                button.setCenter(myself.controlBar.center());
                button.setRight(x);
                x -= button.width();
                x -= padding;
            }
        );

        x = Math.min(
            startButton.left() - (3 * padding + 2 * stageSizeButton.width()),
            myself.right() - StageMorph.prototype.dimensions.x *
                (myself.isSmallStage ? myself.stageRatio : 1)
        );
        [stageSizeButton, appModeButton].forEach(
            function (button) {
                x += padding;
                button.setCenter(myself.controlBar.center());
                button.setLeft(x);
                x += button.width();
            }
        );

        settingsButton.setCenter(myself.controlBar.center());
        settingsButton.setLeft(this.left());

       /* cloudButton.setCenter(myself.controlBar.center());
        cloudButton.setRight(settingsButton.left() - padding);*/

        projectButton.setCenter(myself.controlBar.center());
        projectButton.setRight(settingsButton.left() - padding);

        this.updateLabel();
    };

    this.controlBar.updateLabel = function () {
        var suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '';

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }

        this.label = new StringMorph(
            (myself.projectName || localize('untitled')) + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        this.label.color = myself.buttonLabelColor;
        this.label.drawNew();
        this.add(this.label);
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
    };
};
IDE_Morph.prototype.toggleAppMode = function (appMode) {
    var world = this.world(),
        elements = [
            this.logo,
            //this.controlBar.cloudButton,
            this.controlBar.projectButton,
            this.controlBar.settingsButton,
            this.controlBar.stageSizeButton,
            this.stageHandle,
            this.corral,
            this.corralBar,
            this.spriteEditor,
            this.spriteBar,
            this.palette,
            this.categories
        ];

    this.isAppMode = isNil(appMode) ? !this.isAppMode : appMode;

    Morph.prototype.trackChanges = false;
    if (this.isAppMode) {
        this.setColor(this.appModeColor);
        this.controlBar.setColor(this.color);
        this.controlBar.appModeButton.refresh();
        elements.forEach(function (e) {
            e.hide();
        });
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.hide();
            }
        });
        if (world.keyboardReceiver instanceof ScriptFocusMorph) {
            world.keyboardReceiver.stopEditing();
        }
    } else {
        this.setColor(this.backgroundColor);
        this.controlBar.setColor(this.frameColor);
        elements.forEach(function (e) {
            e.show();
        });
        this.stage.setScale(1);
        // show all hidden dialogs
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.show();
            }
        });
        // prevent scrollbars from showing when morph appears
        world.allChildren().filter(function (c) {
            return c instanceof ScrollFrameMorph;
        }).forEach(function (s) {
            s.adjustScrollBars();
        });
        // prevent rotation and draggability controls from
        // showing for the stage
        if (this.currentSprite === this.stage) {
            this.spriteBar.children.forEach(function (child) {
                if (child instanceof PushButtonMorph) {
                    child.hide();
                }
            });
        }
    }
    this.setExtent(this.world().extent()); // resume trackChanges
};
//
IDE_Morph.prototype.projectMenu = function () {
    var menu,
        myself = this,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds',
        //shiftClicked = (world.currentKey === 16);

    // Utility for creating Costumes, etc menus.
    // loadFunction takes in two parameters: a file URL, and a canonical name

    menu = new MenuMorph(this);
    menu.addItem('Project notes...', 
        'editProjectNotes');
    menu.addLine();
    menu.addItem('New', 
        'createNewProject',
        localize('New empty project'));
    menu.addItem(
        'Open...',
        'makersOpenProject',
        localize('open a project') // looks up the actual text in the translator
    );
    menu.addItem(
        'Save',
        'saveFile',
        localize('Save project as XML file')
    );
    menu.addLine();
    menu.addItem(
        localize(graphicsName) + '...',
        'makersLoadGraphics',
        localize('Select a costume from the media library')
    );
    menu.addItem(
        localize('Sounds') + '...',
        'makersLoadSounds',
        localize('Select a sound from the media library')
    );
    menu.addLine();
    menu.addItem(
        'Load examples...',
        'loadExamples',
        localize('Load FirstMakers examples')
    );
    menu.popup(world, pos);
};


IDE_Morph.prototype.makersOpenProject = function(){
    var myself= this;   
    var inp = document.createElement('input');
    if (myself.filePicker) {
        document.body.removeChild(myself.filePicker);
        myself.filePicker = null;
    }
    inp.type = 'file';
    inp.style.color = "transparent";
    inp.style.backgroundColor = "transparent";
    inp.style.border = "none";
    inp.style.outline = "none";
    inp.style.position = "absolute";
    inp.style.top = "0px";
    inp.style.left = "0px";
    inp.style.width = "0px";
    inp.style.height = "0px";
    inp.addEventListener(
        "change",
        function () {
            document.body.removeChild(inp);
            myself.filePicker = null;
            world.hand.processDrop(inp.files);
        },
        false
    );
    document.body.appendChild(inp);
    myself.filePicker = inp;
    inp.click();        
}

IDE_Morph.prototype.makersLoadGraphics = function(){
    var myself = this;
    var graphicsName = this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds';
    var pos = this.controlBar.projectButton.bottomLeft();
    var dir = graphicsName,
        names = myself.getCostumesList(dir),
        libMenu = new MenuMorph(
                myself,
                localize('Import') + ' ' + localize(dir)
        );

    function loadCostume(name) {
        var url = dir + '/' + name,
            img = new Image();
            img.onload = function () {
                var canvas = newCanvas(new Point(img.width, img.height));
                canvas.getContext('2d').drawImage(img, 0, 0);
                myself.droppedImage(canvas, name);
            };
            img.src = url;
    }
    names.forEach(function (line) {
        if (line.length > 0) {
            libMenu.addItem(
                line,
                function () {loadCostume(line); }
            );
        }
    });
    libMenu.popup(world, pos);
}

IDE_Morph.prototype.makersLoadSounds = function(){
    var myself = this;
    var pos = this.controlBar.projectButton.bottomLeft();
    var names = this.getCostumesList('Sounds'),
    libMenu = new MenuMorph(this, localize('Import')+' '+localize('Sounds'));

    function loadSound(name) {
        var url = 'Sounds/' + name,
            audio = new Audio();
            audio.src = url;
            audio.load();
            myself.droppedAudio(audio, name);
    }
    names.forEach(function (line) {
        if (line.length > 0) {
            libMenu.addItem(
                line,
                function () {loadSound(line); }
            );
        }
    });
    libMenu.popup(world, pos);
}

/**
*Carga ejemplos predeterminados.
*/
IDE_Morph.prototype.loadExamples = function(){
    var pos = this.controlBar.projectButton.bottomLeft(),
        myself = this,
        fs = require('fs'),
        libMenu = new MenuMorph(this, 'Load example'),
        libUrl = './examples/examples.txt'
    function loadLib(name) {
        var path = './examples/'+ name+ '.xml';
                myself.droppedText(fs.readFileSync(path).toString(), name);
    }
    fs.readFileSync(libUrl).toString().split('\n').forEach(function (line) {
        if (line.length > 0) {
            libMenu.addItem(
            line.substring(line.indexOf('\t') + 1),
            function () {
                loadLib(
                    line.substring(0, line.indexOf('\t'))
                );
            });
        }
    });
    libMenu.popup(world, pos);
}

/**
*Guarda un archivo xml que contiene un proyecto de bloques.
*/
IDE_Morph.prototype.saveFile = function(){
    var myself = this;
    var dialog = document.createElement('input');
    dialog.type = 'file';
    dialog.nwworkingdir = MakerApp.userHomePath;
    dialog.nwsaveas = this.projectName || '';
    dialog.accept = '.XML';
    fs = require('fs');
    dialog.addEventListener('change',function(evt){     
        myself.setProjectName(evt.path[0].files[0].name);
        var path = dialog.value;
        var data = myself.serializer.serialize(myself.stage);
        fs.writeFile(path, data, 'utf8',function(error){
            if(error)
                myself.showMessage(localize(error));
            else
                myself.showMessage(localize('Exported!'),2);
            });      
    });
    dialog.click();
}
TurtleIconMorph.prototype.userMenu = function () {
    return;
};

IDE_Morph.prototype.savePic = function(img64){
    var myself = this; 
    var dialog = document.createElement('input');
    dialog.type = 'file';
    dialog.nwworkingdir = MakerApp.userHomePath;
    dialog.nwsaveas = 'image';
    dialog.accept = '.png';
    var fs = require('fs');
    dialog.addEventListener('change',function(evt){
        var path = dialog.value;
        var data =  img64.replace(/^data:image\/\w+;base64,/, "");
        var buffer = new Buffer(data, 'base64');
        fs.writeFile(path, buffer,function(error){
            if(error)
              MakerApp.inform(error);
            else
              MakerApp.inform(localize('Image Exported!'));
            });      
    });
    dialog.click();
}

IDE_Morph.prototype.exportSprite = function (sprite) {

    var data = this.serializer.serialize(sprite.allParts());
    var myself = this; 
    var dialog = document.createElement('input');
    dialog.type = 'file';
    dialog.nwworkingdir = MakerApp.userHomePath;
    dialog.nwsaveas = sprite.name || 'sprite';
    dialog.accept = '.xml';
   
    var fs = require('fs');
    var buffer = '<sprites app="'
        + this.serializer.app
        + '" version="'
        + this.serializer.version
        + '">'
        + data
        + '</sprites>'
    dialog.addEventListener('change',function(evt){
        var path = dialog.value;
        fs.writeFile(path, buffer, function(error){
            if(error)
              MakerApp.inform(error);
            else
              MakerApp.inform(localize('Sprite Exported!'));
            });      
    });
    dialog.click();  
};
/*
IDE_Morph.prototype.setDefaultDesign = function () {
    MorphicPreferences.isFlat = false;
    SpriteMorph.prototype.paletteColor = new Color(230, 230, 230);
    SpriteMorph.prototype.paletteTextColor = new Color(60, 60, 60);
    StageMorph.prototype.paletteTextColor = new Color(0,0,0);
    StageMorph.prototype.paletteColor = new Color(20,20,20);
    SpriteMorph.prototype.sliderColor = SpriteMorph.prototype.paletteColor;
    
    IDE_Morph.prototype.buttonContrast = 0;
    
    IDE_Morph.prototype.backgroundColor = new Color(200,200,200);
    IDE_Morph.prototype.frameColor = new Color(230, 230, 230);

    IDE_Morph.prototype.groupColor = new Color(190, 190, 190);
    
    IDE_Morph.prototype.sliderColor = new Color(190, 190, 190);
    IDE_Morph.prototype.buttonLabelColor = new Color(80,80,80);
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.groupColor= new Color(100,100,100),//hover color
        IDE_Morph.prototype.groupColor= new Color(220,220,220)
    ];
    
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    //IDE_Morph.prototype.appModeColor = new Color(40, 40, 240);
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    IDE_Morph.prototype.padding = 4;
    
    SpriteIconMorph.prototype.labelColor
        = new Color(60,60,60);
    CostumeIconMorph.prototype.labelColor
        = new Color(60,60,60);
    SoundIconMorph.prototype.labelColor
        = new Color(60,60,60);
    TurtleIconMorph.prototype.labelColor
        = new Color(60,60,60);
    TurtleIconMorph.prototype.fontSize = 10;
};

IDE_Morph.prototype.createCategories = function () {
    // assumes the logo has already been created
    var myself = this;

    if (this.categories) {
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.silentSetWidth(this.logo.width()); // width is fixed

    function addCategoryButton(category) {
        var labelWidth = 80,
            colors = [
                new Color(160,160,160),
                new Color(120,120,120),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            function () {
                myself.currentCategory = category;
                myself.categories.children.forEach(function (each) {
                    each.refresh();
                });
                myself.refreshPalette(true);
            },
            category[0].toUpperCase().concat(category.slice(1)), // label
            function () {  // query
                return myself.currentCategory === category;
            },
            null, // env
            null, // hint
            null, // template cache
            labelWidth, // minWidth
            true // has preview
        );

        button.corner = 8;
        button.padding = 2;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = new Color(255,255,255,0);
        //button.labelColor = myself.buttonLabelColor;
        button.labelColor = new Color(255,255,255);
        button.fontSize = 12;
        
        button.fixLayout();
        button.refresh();
     
        myself.categories.add(button);
        
        return button;
    }

    function fixCategoriesLayout() {
        var buttonWidth = myself.categories.children[0].width(),
            buttonHeight = myself.categories.children[0].height(),
            border = 3,
            rows =  Math.ceil((myself.categories.children.length) / 2),
            xPadding = (myself.categories.width()
                - border
                - buttonWidth * 2) / 3,
            yPadding = 2,
            l = myself.categories.left(),
            t = myself.categories.top(),
            i = 0,
            row,
            col;

        myself.categories.children.forEach(function (button) {
            i += 1;
            row = Math.ceil(i / 2);
            col = 2 - (i % 2);
            button.setPosition(new Point(
                l + (col * xPadding + ((col - 1) * buttonWidth)),
                t + (row * yPadding + ((row - 1) * buttonHeight) + border)
            ));
        });

        myself.categories.setHeight(
            (rows + 1) * yPadding
                + rows * buttonHeight
                + 2 * border
        );
    }

    SpriteMorph.prototype.categories.forEach(function (cat) {
        if (!contains(['lists', 'other'], cat)) {
            addCategoryButton(cat);
        }
    });
    fixCategoriesLayout();
    this.add(this.categories);
};*/
