'use strict';
//uuid: 'Mambo_612354'
//uuid: 'Mambo_612519'
//uuid: 'Mambo_614243'
//uuid: 'Mambo_612553'
//uuid: 'Mambo_612554'
var Drone = require('parrot-minidrone');
var drone = new Drone({
    autoConnect: true
});

var io = require('socket.io')();

var connectedClients = {};

drone.on('connected', () => {
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
});

io.on('connection', function(client){
    connectedClients[client] = client;
    console.log('Client connected.');

    client.on('disconnect', function(){
        delete connectedClients[client];
        console.log('Client disconnected');
    });
});

io.listen(3000);
console.log('Server listening on port 3000');
