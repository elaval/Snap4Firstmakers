makersTempDict = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/
    // primitive blocks:

    /*
        Attention Translators:
        ----------------------
        At this time your translation of block specs will only work
        correctly, if the order of formal parameters and their types
        are unchanged. Placeholders for inputs (formal parameters) are
        indicated by a preceding % prefix and followed by a type
        abbreviation.

        For example:

            'say %s for %n secs'

        can currently not be changed into

            'say %n secs long %s'

        and still work as intended.

        Similarly

            'point towards %dst'

        cannot be changed into

            'point towards %cst'

        without breaking its functionality.
    */

    // makers:
    
    'led on':
        'prender led',

    'led off':
        'apagar led',

    'buzzer at %buzzerval':
        'bocina en %buzzerval',

    'temperature':
        'temperatura',

    'ligth':
        'luz',

    'sound':
        'sonido',

    'potentiometer':
        'potenciometro',

    'switch':
        'botón',

    'Authorize Twitter Account':
        'Autorizar cuenta Twitter',

    'send Tweet %s':
        'enviar Tweet %s',

    'Arduino not connected':
        'Arduino no está conectado',

    'Your local browser will be directed to\na Twitter Web page that will request\nauthorization for this App to send\nTweets and will give you a PIN number\n\n':
        'Su navegador local se dirigirá a una\npágina Web de Twitter que le solicitará\nautorización para que este programa envíe\nTweets, y le entregará un número de acceso(PIN)\n\n',

    'Type the PIN number here\n' :
        'Escriba el PIN acá\n',

    'PIN number you get from browser page' : 
        'PIN number obtenido en la página web',

    'Successful authorization for Twitter account':
        'Autorización exitosa para la cuenta Twitter',

    'You may now send tweets (on behalf of':
        'Ahora puedes enviar tweets (en nombre de'

};

// Add attributes to original SnapTranslator.dict.es
for (var attrname in makersTempDict) { SnapTranslator.dict.es[attrname] = makersTempDict[attrname]; }
