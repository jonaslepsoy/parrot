import React, {Component} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

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
            </div>
        );
    }
}

export default DroneItem;
