'use strict';
//uuid: 'Mambo_612354'
//uuid: 'Mambo_612519'
//uuid: 'Mambo_614243'
//uuid: 'Mambo_612553'
//uuid: 'Mambo_612554'
var noble = require('noble');
var RollingSpider = require("rolling-spider");

var io = require('socket.io')();

const drone = {};

var connectedClients = {};

var knownDevices = [];

io.on('connection', function(client){
    connectedClients[client] = client;
    console.log('Client connected.');

    client.on('searchForDrones', function(){
        console.log('Fikk melding om search');
        // client.emit('searchResponse', rollingSpider);
        if (noble.state === 'poweredOn') {
            start();
        } else {
            noble.on('stateChange', start);
        }

        function start () {
            noble.startScanning();

            noble.on('discover', function(peripheral) {
                if (!RollingSpider.isDronePeripheral(peripheral)) {
                    return; // not a rolling spider
                }

                var details = {
                    name: peripheral.advertisement.localName,
                    uuid: peripheral.uuid,
                    rssi: peripheral.rssi
                };

                knownDevices[details.name] = details;
                client.emit('searchResponse', details);
            });
        }
    });

    client.on('connectToDrone', function (name) {
        drone[name] = new RollingSpider(name);
        console.log('Connecting to ' + name);
        drone[name].connect(function() {
            drone[name].setup(function() {
                drone[name].flatTrim();
                drone[name].startPing();
                drone[name].flatTrim();
                console.log('Connected to drone', drone[name].name);
                client.emit('connected', name);
            });
        });
    });

    client.on('takeOffAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].takeOff();
        })
    });

    client.on('getDownAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].land();
        })
    });

    client.on('takeOff', function (name) {
        drone[name].takeOff();
    });
    client.on('getDown', function (name) {
        drone[name].land();
    });

    client.on('disconnect', function(){
        delete connectedClients[client];
        console.log('Client disconnected');
    });

    client.on('forwardAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].forward({steps: 2});
        })
    });

    client.on('forward', function (name) {
        drone[name].forward({steps: 2});
    });
    client.on('rightAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].right({steps: 2});
        })
    });

    client.on('right', function (name) {
        drone[name].right({steps: 2});
    });

    client.on('leftAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].left({steps: 2});
        })
    });

    client.on('left', function (name) {
        drone[name].left({steps: 2});
    });
    
    client.on('forwardFlipAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].frontFlip();
        })
    });
    
    client.on('backAll', function () {
        Object.keys(drone).forEach((d) => {
            drone[d].backward({steps: 2});
        })
    });
});

io.listen(3000);
console.log('Server listening on port 3000');
