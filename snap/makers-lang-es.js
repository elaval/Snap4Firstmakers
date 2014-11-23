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

    // menus:
    
    'About Snap!...':
        'Acerca de Snap ...',

    'Snap! reference manual.':
        'Manual de referencia de Snap',

    'Snap4Arduino website':
        'Sitio web de Snap4Arduino',

    'Download Snap! source':
        'Descargar código fuente de Snap',

    'Snap4Arduino repository':
        'Repositorio de Snap4Arduino',

    'Libraries...':
        'Librerías...',

    'Load examples...':
        'Cargar ejemplos...',

    'Load example':
        'Cargar ejemplo',

    'Blink (Turn on/off led)':
        'Blink (Prender/apagar luz)', 

    'Test FirstMakers Board':
        'Test de tarjeta FirstMakers', 

    'FirstMakers v1.0 compatible':
        'Compatible con FirstMakers v1.0', 

    'Zoom blocks...':
        'Zoom en bloques...',

    'Stage size...':
        'Tamaño del escenario ...',

    'Plain prototype labels':
        'Etiquetas de prototipos planas',

    'Turbo mode':
        'Modo turbo',

    'Flat design':
        'Diseño plano',

    'Prefer smooth animations':
        'Preferir animaciones suaves',

    'Flat line ends':
        'Fin de líneas plano',

    'Codification support':
        'Apoyo en la codificación',

    'Makers basic mode':
        'Makers en modo básico',

    // mensajes:

    'Opening project...':
        'Abriendo el proyecto...',

    'Untitled':
        'Sin título',


    // makers:
    
    'turn on led %ledcolor':
        'prender led %ledcolor',

    'turn off led %ledcolor':
        'apagar led %ledcolor',

    'white (w)' : 
        'blanco (w)',    

    'w' : 
        'b',

    'red (r)' : 
        'rojo (r)',

    'yellow (y)' : 
        'amarillo (y)',

    'green (g)' : 
        'verde (g)',

    'buzzer at %buzzerval':
        'bocina en %buzzerval',

    'buzzer on':
        'prender bocina',

    'buzzer off':
        'apagar bocina',

    'temperature':
        'temperatura',

    'light':
        'luz',

    'sound':
        'sonido',

    'humidity':
        'humedad',

    'infrared':
        'infrarojo',

    'potentiometer':
        'potenciómetro',

    'switch':
        'botón',

    'turn on pin %actuatorPin':
        'prender pin %actuatorPin',

    'turn off pin %actuatorPin':
        'apagar pin %actuatorPin',

    'set pwm %pwmPin to %pwmValue':
        'fijar pwm %pwmPin en %pwmValue',

    'read analog %sensorPin':
        'leer pin análogo %sensorPin',

    'read digital %digitalPin':
        'leer pin digital %digitalPin',

    'Authorize Twitter Account':
        'Autorizar cuenta Twitter',

    'send Tweet %s':
        'enviar Tweet %s',

    'temperature in %s': 
        'temperatura en %s',

    'xively read datastream %s from feed %s with key %s': 
        'xively leer datastream %s de feed %s con clave %s',

    'thingspeak read field %s from channel %s with key %s': 
        'thingspeak leer campo %s de canal %s con clave %s',

    'thingspeak set value %s at field %s in channel %s with key %s': 
        'thingspeak fijar valor %s en campo %s para canal %s con clave %s',

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
