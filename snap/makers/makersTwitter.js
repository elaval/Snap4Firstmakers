'use strict';

/**
 * WorldMorph.prototype.makers.twitter
 * Functionality & variables for Twitter interaction from Makers blocks
 *
 * Defined in this file:
 * WorldMorph.prototype.makers.twitter.APIKey
 * WorldMorph.prototype.makers.twitter.APISecret
 * WorldMorph.prototype.makers.twitter.TwitterDialogMorph
 * WorldMorph.prototype.makers.twitter.requestPin
 * WorldMorph.prototype.makers.twitter.processPin
 */

// Encapsulate all twitter functionality in WorldMorph.prototype.makers.twitter object 
WorldMorph.prototype.makers.twitter = {
};


// APIKey & API Secret from Twitter Application associated to the Twitter API calls (by default it is FirstMakers APP that belongs to the firstmakers twitter account)
WorldMorph.prototype.makers.twitter.APIKey = 'Y7nczrrpIbyCYbk8BXjOiFfjM',
WorldMorph.prototype.makers.twitter.APISecret = 'FF35z7tBBJRo5ap8LBqSZcbGaQOMxdKd2ldHGc1PNY5PPNlbeK'

/**
 * WorldMorph.prototype.makers.twitter.TwitterDialogMorph
 * DialogBox that informs the user of Browser authentication and requires
 * PIN generated for the Twitter Authetication process.
 */
WorldMorph.prototype.makers.twitter.TwitterDialogMorph = function(target, action, environment) {
    this.init(target, action, environment);
}

WorldMorph.prototype.makers.twitter.TwitterDialogMorph.prototype = new DialogBoxMorph();
WorldMorph.prototype.makers.twitter.TwitterDialogMorph.prototype.constructor = WorldMorph.prototype.makers.twitter.TwitterDialogMorph;
WorldMorph.prototype.makers.twitter.TwitterDialogMorph.uber = DialogBoxMorph.prototype;

// TwitterDialogMorph instance creation:

WorldMorph.prototype.makers.twitter.TwitterDialogMorph.prototype.init = function (target, action, environment) {
     // initialize inherited properties:
    BlockDialogMorph.uber.init.call(
        this,
        target,
        action,
        environment
    );

    // override inherited properites:
    this.message = new AlignmentMorph('row', this.padding);

    var msgText = localize('Your local browser will be directed to\n' 
        + 'a Twitter Web page that will request\n'
        + 'authorization for this App to send\n'
        + 'Tweets and will give you a PIN number\n\n')
        + localize('Type the PIN number here\n');

    this.myString = new TextMorph(msgText);

    this.message.add(this.myString);
    this.add(this.message);
    this.fixLayout();
};


WorldMorph.prototype.makers.twitter.TwitterDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.silentSetWidth(this.body.width() + this.padding * 2);
        this.silentSetHeight(
            this.body.height()
                + this.padding * 2
                + th
        );
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.message) {
        this.message.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.message.height()
                    + this.padding
        );
        this.silentSetWidth(Math.max(
            this.width(),
            this.message.width() + this.padding * 2
        ));
        this.message.setCenter(this.center());
        if (this.body) {
            this.message.setTop(this.body.bottom() + this.padding);
        } 
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.buttons.height()
                    + this.padding
        );
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }
};

/**
 * WorldMorph.prototype.makers.twitter.requestPinrequestPin
 * Uses twitter api to obtain a Request Token using oob (Out of Band) flow.
 * 
 * We will obtain a requestToken & requestSecret and then redirect the user 
 * to an external (local browser) web page for Twitter authentication/authorization
 * if successful, the page will provide the user a PIN number which can be used
 * later (in WorldMorph.prototype.makers.twitter.processPin) to obtain the accessToken that is 
 * required for using the Twitter API on behalf of the user.
 */
WorldMorph.prototype.makers.twitter.requestPin = function(callback) {
	var gui = require('nw.gui');
    
	if (WorldMorph.prototype.makers.twitter.twitterAPI === undefined) {
		var twitterAPI = require('node-twitter-api');
		WorldMorph.prototype.makers.twitter.twitterAPI = new twitterAPI({
		    consumerKey: WorldMorph.prototype.makers.twitter.APIKey,
		    consumerSecret: WorldMorph.prototype.makers.twitter.APISecret,
		    callback: 'oob'
		});
	}

	WorldMorph.prototype.makers.twitter.twitterAPI.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	    if (error) {
            console.log('Error getting OAuth request token : ' + error);
            callback(new Error(error));
	    } else {
	    	console.log('Got request token from Twitter');
            // Records requestToken & requestTokenSecret for later use
	    	WorldMorph.prototype.makers.twitter.requestToken = requestToken;
	    	WorldMorph.prototype.makers.twitter.requestTokenSecret = requestTokenSecret;
	    	
            gui.Shell.openExternal('https://twitter.com/oauth/authenticate?oauth_token='+requestToken);
            callback(null,results);
	    }
	});

}

/**
 * WorldMorph.prototype.makers.twitter.processPin
 * Given an appropiate Twitter PIN (obtained through WorldMorph.prototype.makers.twitter.requestPin)
 * we request an accessToken & accessTokenSecret which is required for calls to the twitter API
 */
WorldMorph.prototype.makers.twitter.processPin = function(pin, callback) {

	if (WorldMorph.prototype.makers.twitter.requestToken === undefined) {
		alert('You need to request a twitter PIN before connecting');
	} else
	{
		WorldMorph.prototype.makers.twitter.twitterAPI.getAccessToken(WorldMorph.prototype.makers.twitter.requestToken, WorldMorph.prototype.makers.twitter.requestTokenSecret, pin, function(error, accessToken, accessTokenSecret, results) {
		    if (error) {
		        console.log(error);
                callback(error);
		    } else {
                // Records requestToken & requestTokenSecret for later use
		    	WorldMorph.prototype.makers.twitter.accessToken = accessToken;
		    	WorldMorph.prototype.makers.twitter.accessTokenSecret = accessTokenSecret;
		    	console.log('Got access token for Twritter account',results);
		        //store accessToken and accessTokenSecret somewhere (associated to the user)
		        //Step 4: Verify Credentials belongs here
                callback(null,results);
		    }
		});
	}

}

