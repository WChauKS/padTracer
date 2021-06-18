// node index.js ####
// npm run dev

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const io = require('socket.io');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
// var readline = require('readline');
const { RSA_X931_PADDING } = require('constants');

app.set('port', process.argv[2] || 3000);
app.use(express.static(path.join(__dirname, '../app')));
app.use(require('./js/routes.js'));

const SerialPort = require('serialport');
const port = new SerialPort('COM3', {
    baudRate: 115200
}, false)

const Readline = require('@serialport/parser-readline');
const { send } = require('process');
const parser = port.pipe(new Readline({delimeter: '\n'}));

gCodeQueue = [];
// serial port automatically opens and homes X, Y, Z
port.on('open', function() {
    console.log('Serial port opened');
    gCodeQueue.push('G28'); // home
    gCodeQueue.push('M82'); // absolute positioning
})

//logs data sent back from serial port
parser.on('data', function(data){
    // console.log(gCodeQueue)
    setTimeout(() => {
        if(data = 'ok'){
            // console.log('command finished');
            console.log(data)
            if(gCodeQueue.length != 0) {
                sendGCode(gCodeQueue[0]);
                gCodeQueue.shift();
                // console.log('gcode sent', gCodeQueue[gCodeQueue.length - 1], '||', gCodeQueue)
            }
        }
    }, 700);
});

function sendGCode(gcode) {
    port.write(gcode+'\n', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('Sending ' + gcode)
        gCodeQueue.shift();
        console.log(gCodeQueue);
    })
}

// prints server start message to server console
app.listen(app.get('port'), function() {
    console.log(
        'Express started on http://localhost:' +
        app.get('port') +
        '; press Ctrl-C to terminate.'
    );
});

// post body returns Orb##, calls removeOrbString to get the orb number
// calls getXYCoordinates to translate that number into xy coordinates
// calls removeOrbString to remove 'Orb' from the beginning
function processOrbs(path) {
    for(var i = 0; i < path.length; i++) {
        path[i] = getXYCoordinates(removeOrbString(path[i]));
    }
    return path;
}

// receives a string with the format Orb##, removes 'Orb' and returns the resulting number
function removeOrbString(orbNum) {
    const removeNumChar = 3;
    orbNum = orbNum.substring(removeNumChar);
    return orbNum;
}

// receives an orb number, translates this into regular cartesian xy coordinates
// row is x, col is y
function getXYCoordinates(orbNum) {
    var x = String(orbNum % 6);
    var y = String(convertYCoordinate(Math.floor(orbNum / 6)));
    return x+y;
}

// site coordinate system has 0,0 in top left corner,
// convert y to match regular xy coordinate system
function convertYCoordinate(y) {
    switch(y) {
        case 4: y = 0; break;
        case 3: y = 1; break;
        case 2: y = 2; break;
        case 1: y = 3; break;
        case 0: y = 4; break;
    }
    return y;
}