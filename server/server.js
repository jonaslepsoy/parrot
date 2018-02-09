'use strict';
//uuid: 'Mambo_612354'
//uuid: 'Mambo_612519'
//uuid: 'Mambo_614243'
//uuid: 'Mambo_612553'
//uuid: 'Mambo_612554'
var RollingSpider = require("rolling-spider");
var rollingSpider = new RollingSpider();

var io = require('socket.io')();
io.on('connection', function(client){
    client.on('list', function(data){
        console.log('Fikk melding om list');
        
    });
    client.on('test', function(data){
        console.log('data',data);
    });
    client.on('disconnect', function(){
        console.log('Client disconnected');
    });
});

io.listen(3000);
console.log('Server listening on port 3000');