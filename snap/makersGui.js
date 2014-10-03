
// Makers logo

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();
    this.logo.texture = 'FirstMakersLogo-sm.png'; // Overriden
    this.logo.drawNew = function () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d'),
            gradient = context.createLinearGradient(
                0,
                0,
                this.width(),
                0
            );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        context.fillStyle = MorphicPreferences.isFlat ?
                myself.frameColor.toString() : gradient;
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
IDE_Morph.prototype.setLanguageS4A = IDE_Morph.prototype.setLanguage;

/*
IDE_Morph.prototype.setLanguage = function(lang, callback) {
    var myself = this;

    myself.setLanguageS4A(lang, function() {
            myself.setLanguageMakers(lang, callback);
    });

};
*/


IDE_Morph.prototype.setLanguageMakers = function (lang, callback) {
    // Load language script for makers related functions
    var makers_translation = document.getElementById('makers-language'),
        makers_src = 'makers-lang-' + lang + '.js',
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

IDE_Morph.prototype.originalToggleAppMode = IDE_Morph.prototype.toggleAppMode;

IDE_Morph.prototype.toggleAppMode = function(mode) {
    this.originalToggleAppMode(mode);
    this.controlBar.cloudButton.hide();
}

// Fix to S4A bug when hiding cloud button (hides also other buttons)
IDE_Morph.prototype.buildPanes = function (){
    var myself = this;

    this.originalBuildPanes();
    this.controlBar.cloudButton.hide();
    
    this.controlBar.originalFixLayout = this.controlBar.fixLayout;

    overridenFixLayout = function () {
        myself.controlBar.originalFixLayout();
        myself.controlBar.projectButton.setLeft(150);
        myself.controlBar.updateLabel()
    };

    this.controlBar.fixLayout = overridenFixLayout;
};

//IDE_Morph.prototype.buildPanes = IDE_Morph.prototype.originalBuildPanes

// Modify settings menu to add basic/advanced mode for makers
IDE_Morph.prototype.originalSettingsMenu = IDE_Morph.prototype.settingsMenu;

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

    this.originalSettingsMenu();

    menu = world.activeMenu;

    menu.addLine();

    addPreference(
        'Makers basic mode',
        function () {
            world.isMakersBasicMode = !world.isMakersBasicMode; 
            myself.refreshIDE();
        },
        world.isMakersBasicMode,
        'uncheck to advanced mode (more block options)',
        'check to enable basic mode (reduced blockoptins)'
    );

    menu.popup(world, pos);
};


// Fix probelm with connected board when creating a new project 
// If the board is connected (it is not freed for the new srpites)
IDE_Morph.prototype.originalnNewProject = IDE_Morph.prototype.newProject


IDE_Morph.prototype.newProject = function () {
    // Disconnect each sprite before creating the new project
    var sprites = this.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduinoDisconnect();
        }
    })
    this.originalnNewProject();
};

