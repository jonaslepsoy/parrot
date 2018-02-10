'use strict';

var keypress = require('keypress');
var Drone = require('rolling-spider');
var Swarm = require('rolling-spider').Swarm;
var noble = require('noble');

var ACTIVE = true;
var STEPS = 2;



function cooldown() {
    ACTIVE = false;
    setTimeout(function () {
        ACTIVE = true;
    }, STEPS * 12);
}

// make `process.stdin` begin emitting 'keypress' events
keypress(process.stdin);

// listen for the 'keypress' event


process.stdin.setRawMode(true);
process.stdin.resume();

/*
1: Mambo_010117 (4ab54f6eaf9449a488fa3f8d10d32ced), RSSI 78
2: Mambo_612477 (7d224080f44d4c979bdc46ad1aef98a2), RSSI -79
3: Mambo_612354 (fe69e6e1430d4a7fbbbb0f84446b2dc3), RSSI 78
4: Mambo_480329 (47d1a9942c144650b28315ab4de50dc6), RSSI 78
5: Mambo_511762 (4e515ab6900f42eca157a66604e80773), RSSI 78
6: Mambo_010372 (ca37246494fb42e48dfb0b3a4b53b1be), RSSI -76
7: Mambo_612519 (1547233255914e0593de6212b9524b3f), RSSI -55
*/

var swarm = new Swarm({
    timeout: 300, // Hvor mange sekunder vi skal vente på at alle droner i membership-lista er tilstede før vi bare kjører på.
    membership: 'Mambo_612354,Mambo_010117,Mambo_511762',
    logger: console.log,
    forceConnect: true
});

swarm.assemble();

swarm.on('assembled', function () {
    console.log('Assembled the swarm');
    //swarm.closeMembership();
    ACTIVE = true;
});


process.stdin.on('keypress', function (ch, key) {
    if (ACTIVE && key) {
        if (key.name === 'm') {
            swarm.emergency();
            setTimeout(function () {
                process.exit();
            }, 3000);
        } else if (key.name === 't') {
            console.log('swarm#takeoff');
            swarm.takeOff();
        } else if (key.name === 'w') {
            console.log('swarm#forward');
            swarm.forward({steps: STEPS});
            cooldown();
        } else if (key.name === 's') {
            console.log('swarm#backward');
            swarm.backward({steps: STEPS});
            cooldown();
        } else if (key.name === 'left') {
            console.log('swarm#turnleft');
            swarm.turnLeft({steps: STEPS});
            cooldown();
        } else if (key.name === 'a') {
            console.log('swarm#tiltleft');
            swarm.tiltLeft({steps: STEPS});
            cooldown();
        } else if (key.name === 'd') {
            console.log('swarm#tiltright');
            swarm.tiltRight({steps: STEPS});
            cooldown();
        } else if (key.name === 'right') {
            console.log('swarm#turnright');
            swarm.turnRight({steps: STEPS});
            cooldown();
        } else if (key.name === 'up') {
            console.log('swarm#up');
            swarm.up({steps: STEPS * 2.5});
            cooldown();
        } else if (key.name === 'down') {
            console.log('swarm#down');
            swarm.down({steps: STEPS * 2.5});
            cooldown();
        } else if (key.name === 'i' || key.name === 'f') {
            swarm.frontFlip({steps: STEPS});
            cooldown();
        } else if (key.name === 'j') {
            swarm.leftFlip({steps: STEPS});
            cooldown();
        } else if (key.name === 'l') {
            swarm.rightFlip({steps: STEPS});
            cooldown();
        } else if (key.name === 'k') {
            swarm.backFlip({steps: STEPS});
            cooldown();
        } else if (key.name === 'p') {
            swarm.takePicture();
            cooldown();
        } else if (key.name === 'q') {
            console.log('Initiated Landing Sequence...');
            swarm.land(function () {
                console.log('land');
                swarm.release(function () {
                    console.log('release');
                });
            });
        }
    }
    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
        process.exit();
    }
});