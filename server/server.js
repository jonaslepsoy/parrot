'use strict';
//uuid: 'Mambo_612354'
//uuid: 'Mambo_612519'
//uuid: 'Mambo_614243'
//uuid: 'Mambo_612553'
//uuid: 'Mambo_612554'
var noble = require('noble');
var RollingSpider = require("rolling-spider");

var io = require('socket.io')();

var connectedClients = {};

var knownDevices = [];

/*drone.on('connected', () => {
    console.log('connected to something!');
    drone.takeOff();
    connectedClients.forEach(function(client) {
        client.emit('Drone ' + drone.name + ' taking off!');
    });
});

drone.on('flightStatusChange', (status) => {
    console.log('Drone status changed: ', status);
    if (status === 'hovering') {
        drone.land();
        connectedClients.forEach(function(client) {
            client.emit('Drone ' + drone.name + ' taking off!');
        });
        process.exit();
    }
});*/

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



    client.on('disconnect', function(){
        delete connectedClients[client];
        console.log('Client disconnected');
    });
});

io.listen(3000);
console.log('Server listening on port 3000');
