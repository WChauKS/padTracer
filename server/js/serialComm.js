const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const mapPositions = require('./createMapPositions.js');
const gCodeMapper = require('./mapToGCode.js');

function Device(port, baudRate) {
    this.serial = new SerialPort(port, {
        baudRate: baudRate
    }, false);
    this.gCodeQueue = [];
    this.map = mapPositions.createMap();
    this.current = null;

    const parser = this.serial.pipe(new Readline({delimiter: '\n'}));
    var device = this;

    this.serial.on('open', function() {
        console.log('Serial port opened');
        this.write('G28\n');        // homes the device to 0, 0, 0
        setTimeout(() => {
            this.write('M82\n');    // sets it to absolute positioning
        }, 4000)
    });

    // marlin device will send 'ok' when message is rcv'd
    parser.on('data', function(data) {
        if(device.current == null) return;
        if(data == 'ok') {
            console.log(data);
            device.current = null;
            device.processQueue();
        }
    });
}

Device.prototype = {
    // TODO: add connect/disconnect
    // if connect: connect to comm device
    // if disconnect: disconnect from comm device
    connect: function() {

    },

    // TODO: add Z motion
    // first gcode moves head to position
    // second LOWERS the head to come into contact with phone
    // last RAISES the head to stop contact with phone and make sure there's enough clearance to move
    //      to the next first position
    trace: function(path){
        for(i = 0; i < path.length; i++) {
            this.gCodeQueue.push(gCodeMapper.createGCode(this.map, path[i]))
        }
        this.processQueue();
    },

    processQueue: function() {
        var step = this.gCodeQueue.shift();
        if(step == null) {
            this.current = null;
            return;
        }
        this.current = step;
        console.log('Sending:', step)
        this.serial.write(step);
    },
}
module.exports = Device;