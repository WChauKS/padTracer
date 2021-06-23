const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

function Device(port, baudRate) {
    this.serial = new SerialPort(port, {
        baudRate: baudRate
    }, false);
    this.gCodeQueue = [];
    const parser = this.serial.pipe(new Readline({delimiter: '\n'}));
    
    this.serial.on('open', function() {
        console.log('Serial port opened');
        setTimeout(() => {
            this.write('M82\n');    // sets it to absolute positioning
        }, 4000)
    });

    parser.on('data', function(data) {
        if(data == 'ok') {
            console.log(data);
        }
    });
}

Device.prototype.trace = function(path){
    console.log('path:', path)
};

module.exports = Device;