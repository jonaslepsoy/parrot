const Drone = require('./lib/parrot-minidrone');
const ioHook = require('iohook');
const temporal = require("temporal");

// flight variables
const forwardSensitivity = 70;
const rotationSensitivity = 100;
const altitudeSensitivity = 70;
const yawSensitivity = 120;
const flightSpeed = 10;
const jumpsSpeed = 100;
var playing = false;

// flight params
var flightParams = {
    yaw: 0,
    pitch: 0,
    roll: 0,
    altitude: 0,
};


const drone = new Drone({
    autoconnect: false,
    droneFilter: 'Mambo_612519'
    //droneFilter: 'Mambo_612477'
});

drone.connect();

drone.on('connected', function(){
    console.log('connected');
});


// listen for the "keydown" event
ioHook.on("keydown", event => {
    const keyName = event && event.keycode ? event.keycode : false;

    console.log("keydown ", keyName)

    if (!keyName) {
        return;
    }

    // p
    if(keyName == '25'){
        playing = !playing;
        flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0,
        };
    }

    if(playing){
        switch (keyName) {
            case 57: //space
                flightParams.altitude = jumpsSpeed;
                currentDownSpeed = jumpsSpeed;
                waitCount = 3;
                break;
            default:
                break;
        }
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
        case 16:    //q
            drone.animate('flipLeft');
            break
        case 18:    //e
            drone.animate('flipRight');
            break
        case 19:    //r
            drone.animate('flipFront');
            break;
        case 33:    //f
            drone.animate('flipBack');
            break;
        case 20:    //t
            playing = false;
            drone.takeoffOrLand();
            break;
        case 57:    //space
            if(!playing) {
                console.log('firing');
                drone.fire();
            }
            break;
        /*case 57: //space
            if(!playing) {
                drone.
            }*/
        case 38:    //t
            drone.land();
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


const gravity = 20;
var currentDownSpeed = 0;
var waitCount = 0;

// Loop every n milliseconds, executing a task each time
temporal.loop(100, function() {

      if(playing && waitCount <= 0 && currentDownSpeed > -100){
            currentDownSpeed = currentDownSpeed - gravity;

            flightParams.pitch = flightSpeed;
            flightParams.altitude = currentDownSpeed;

            drone.setFlightParams(flightParams);

            console.log("currentDownSpeed ", currentDownSpeed);
      }

      waitCount--;

});



  // |this| is a reference to the temporal instance
  // use it to cancel the loop by calling:
  //
  //this.stop();

  // The number of times this loop has been executed:
  //this.called; // number

  // The first argument to the callback is the same as |this|
