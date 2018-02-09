'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider({uuid: 'Mambo_612522'});
//uuid: 'Mambo_612354'
//uuid: 'Mambo_612519'
//uuid: 'Mambo_614243'
//uuid: 'Mambo_612553'
//uuid: 'Mambo_612554'

rollingSpider.connect(function () {
    console.log('connected');
    //console.log('spider', JSON.stringify(rollingSpider, null, 2));
    rollingSpider.setup(function () {
        console.log('on line');
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();
        console.log('starting queue');
        temporal.queue([
            {
                delay: 5000,
                task: function () {
                    rollingSpider.takeOff();
                    rollingSpider.flatTrim();
                }
            },
            {
                delay: 3000,
                task: function () {
                    rollingSpider.forward();
                }
            },
            {
                delay: 5000,
                task: function () {
                    rollingSpider.land();
                }
            },
            {
                delay: 5000,
                task: function () {
                    temporal.clear();
                    process.exit(0);
                }
            }
        ]);
    });
});