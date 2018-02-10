import React, {Component} from 'react';
import io from 'socket.io-client';

const socket = io('http://10.168.79.18:3000');

class DroneItem extends Component {
constructor(props) {
    super(props);
    this._connectToDrone = this._connectToDrone.bind(this);
    this._takeOff = this._takeOff.bind(this);
    this._takeOffAll = this._takeOffAll.bind(this);
    this._getDown = this._getDown.bind(this);
    this._getDownAll = this._getDownAll.bind(this);
    this._forward = this._forward.bind(this);
    this._forwardAll = this._forwardAll.bind(this);
    this._rightAll = this._rightAll.bind(this);
    this._leftAll = this._leftAll.bind(this);
    this._right = this._right.bind(this);
    this._left = this._left.bind(this);
    this._forwardFlipAll = this._forwardFlipAll.bind(this);
    this._backAll = this._backAll.bind(this);

    this.state = {
        connected: false
    };
}


    componentDidMount() {
    }

    _connectToDrone(name) {
        // console.log('Connecting to drone');
        socket.emit('connectToDrone', name);
        socket.on('connected', function (status) {
            console.log('ALKSHUOFHASFHJASHFJAHFO', status);
            if(status) {
                this.setState({connected: true});
            }
        }.bind(this));
    }

    _takeOff(name) {
        socket.emit('takeOff', name);
    }

    _takeOffAll() {
        socket.emit('takeOffAll');
    }

    _getDown(name) {
        socket.emit('getDown', name);
    }

    _getDownAll() {
        socket.emit('getDownAll');
    }

    _forwardAll() {
        socket.emit('forwardAll');
    }

    _forward(name) {
        socket.emit('forward', name);
    }

    _rightAll() {
        socket.emit('rightAll');
    }

    _right(name) {
        socket.emit('right', name);
    }

    _leftAll() {
        socket.emit('leftAll');
    }

    _left(name) {
        socket.emit('left', name);
    }
    
    _forwardFlipAll() {
        socket.emit('forwardFlipAll');
    }
        
    _backAll() {
        socket.emit('backAll');
    }

    render() {
        return (
            <div className="showAndConnect">
                <h3>{this.props.drone.name}</h3>
                <div>RSSI: {this.props.drone.rssi}</div>
                <div>UUID: {this.props.drone.uuid}</div>
                { this.state.connected ? <button onClick={() => this._takeOffAll() }>Take Off All</button> : <button onClick={() => this._connectToDrone(this.props.drone.name) }>connect</button> }
                <button onClick={() => this._takeOff(this.props.drone.name)}>Take off</button>
                <button onClick={() => this._getDown(this.props.drone.name) }>GET DOOOWN!</button>
                <button onClick={() => this._getDownAll() }>GET DOOOWN! All</button>
                <button onClick={() => this._forwardAll() }>FORWARD ALL</button>
                <button onClick={() => this._forward(this.props.drone.name) }>FOrward</button>
                <button onClick={() => this._rightAll() }>right ALL</button>
                <button onClick={() => this._right(this.props.drone.name) }>right</button>
                <button onClick={() => this._leftAll() }>left ALL</button>
                <button onClick={() => this._left(this.props.drone.name) }>left</button>
                <button onClick={() => this._forwardFlipAll() }>forwardFlip ALL</button>
                <button onClick={() => this._backAll() }>back ALL</button>
            </div>
        );
    }
}

export default DroneItem;
