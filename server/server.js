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
        console.log('Got request for drone list. Searching...');
        rollingSpider.connect(function(){
            rollingSpider.setup(function() {
                rollingSpider.flatTrim();
                rollingSpider.startPing();
                rollingSpider.flatTrim();
                console.log('Connected to drone', rollingSpider.name);
                io.emit('drone connected', rollingSpider.name);
            });
        });
    });
    client.on('disconnect', function(){
        console.log('Client disconnected');
    });
});

io.listen(3000);
console.log('Server listening on port 3000');
