/*
    Changes to WorldMorph for managing global Makers functions
*/

/**
 * Global object (world.arduino) used for s4a/arduino properties
 */
WorldMorph.prototype.makers = {
};

/**
 * Functions for trasnforming analog values [0,1023] into measures
 */

WorldMorph.prototype.makers.convertAnalogMeasure = {
    // Temperature sensor LW35
    // Each 10 mV is 1 degree celsius
    'temperatureLW35' : function(val) {
        var millivolts = val*5000.0/1023.0,
            celsius = millivolts/10;

        // return rouded to 1 decimal
        return Math.round(10*celsius)/10;
    },

    // Potentiometer - gives (0 to 5 volts)
    'potentiometer' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Temporarily is a linear relation volts to percentage
    // Needs to be adjusted with a proper curve
    'light' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Temporarily is a linear relation volts to percentage
    // Needs to be adjusted with a proper curve
    'audio' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    }





}