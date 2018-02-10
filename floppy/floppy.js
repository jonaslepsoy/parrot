const Drone = require('./lib/parrot-minidrone');
const ioHook = require('iohook');

// flight variables
const forwardSensitivity = 70;
const rotationSensitivity = 100;
const altitudeSensitivity = 70;
const yawSensitivity = 100;
const forwardSpeed = 10;
const downSpeed = -25;
const jumpsSpeed = 120;
var droneForward= 0;
var droneDown = 0;
var playing = false;

// flight params
var flightParams = {
    yaw: 0,
    pitch: droneForward,
    roll: 0,
    altitude: droneDown,
};



const drone = new Drone({
    autoconnect: false,
    droneFilter: 'Mambo_612519'
});

drone.connect();

let timeout = null;

// listen for the "keydown" event
ioHook.on("keydown", event => {
    const keyName = event && event.keycode ? event.keycode : false;

    if (!keyName) {
        return;
    }

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    // p
    if(keyName == '25'){
        playing = !playing;
        if(playing){
            droneForward = 10;
            droneDown = -25;
        } else {
            droneForward = 0;
            droneDown = 0;
        }
    }

    if(playing){
        switch (keyName) {
            case 57: //space
                flightParams.altitude = jumpsSpeed;
                break;
            default:
                break;
        }

        timeout = setTimeout(() => {
            drone.setFlightParams({
                yaw: 0,
                pitch: droneForward,
                roll: 0,
                altitude: droneDown,
            });
        }, 200);
    }

    switch (keyName) {
        case 57416: //up
            flightParams.pitch = forwardSensitivity;
            break;
        case 57424: //down
            flightParams.pitch = -forwardSensitivity;
            break;
        case 57419: //left
            flightParams.roll = -rotationSensitivity;
            break;
        case 57421: //right
            flightParams.roll = rotationSensitivity;
            break;
        case 17:    //w
            flightParams.altitude = altitudeSensitivity;
            break;
        case 31:    //s
            flightParams.altitude = -altitudeSensitivity;
            break;
        case 30:    //a
            flightParams.yaw = -yawSensitivity;
            break;
        case 32:    //d
            flightParams.yaw = yawSensitivity;
            break;
        case 20:    //t
            drone.takeoffOrLand();
            break;
        case 33:    //f
            drone.trim();
            break;
        case 1:     //esc
            drone.emergency();
            break;
        case 46:    //c
            process.exit();
            break;
        default:
            break;
    }

    drone.setFlightParams(flightParams);
})

// listen for the "keyup" event
ioHook.on("keyup", event => {
    const keyName = event && event.keycode ? event.keycode : false;

    switch (keyName) {
            case 57416: //up
                flightParams.pitch = 0;
                break;
            case 57424: //down
                flightParams.pitch = 0;
                break;
            case 57419: //left
                flightParams.roll = 0;
                break;
            case 57421: //right
                flightParams.roll = 0;
                break;
            case 17:    //w
                flightParams.altitude = 0;
                break;
            case 31:    //s
                flightParams.altitude = 0;
                break;
            case 30:    //a
                flightParams.yaw = 0;
                break;
            case 32:    //d
                flightParams.yaw = 0;
                break;
            default:
                break;
        }

    drone.setFlightParams(flightParams);
})

ioHook.start();