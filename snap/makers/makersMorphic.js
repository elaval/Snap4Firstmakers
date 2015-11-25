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
            celsius = millivolts/29;

        if (world.isMakersV1) {
            celsius = millivolts/10;
        } 

        // return rouded to 1 decimal
        return Math.round(10*celsius)/10;
    },

    // Potentiometer - gives (0 to 5 volts)
    'potentiometer' : function(val) {
        var maxVal = 1023*20000.0/20000;
        var percentage = 100.0*(val)/maxVal;

        // For compatibility with version 1.0 of the board (inverser potentiometer readings)
        if (world.isMakersV1) {
            percentage = 100.0*(maxVal-val)/maxVal;
        }
        
        percentage = percentage < 0 ? 0 : percentage;
        percentage = percentage > 100 ? 100 : percentage;

        // return rounded to 1 decimal
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
    },

    // Linear relation volts to percentage
    'humidity' : function(val) {
        var percentage = 100.0*val/1023.0;

        // return rouded to 1 decimal
        return Math.round(10*percentage)/10;
    },

    // Normal statr is val > 900
    // When signal is detected, goes below 100
    'infrared' : function(val) {

        return val < 100;
    },





}