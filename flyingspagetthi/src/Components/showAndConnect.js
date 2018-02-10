import React, {Component} from 'react';
import DroneItem from './droneItem';

import io from 'socket.io-client';

const socket = io('http://10.168.79.18:3000');

class ShowAndConnect extends Component {
    constructor(props) {
        super(props);
        this._searchForDrones = this._searchForDrones.bind(this);
        this._showDrones = this._showDrones.bind(this);

        this.state = {
            drones: []
        };
    }


    componentDidMount() {
    }

    _searchForDrones() {
        console.log('Sender emit');
        socket.emit('searchForDrones', function () {
        });

        socket.on('searchResponse', function (drone) {
            const drones = this.state.drones;
            drones[drone.name] = drone;
            // console.log('setting state with drone ', drone.name);
            this.setState({
                drones: drones
            });
        }.bind(this));
    }

    _showDrones() {
        const droneList = Object.keys(this.state.drones).map((droneName) => {
            // console.log('drone', this.state.drones[droneName]);
            return <DroneItem key={this.state.drones[droneName].name} drone={this.state.drones[droneName]}/>
        });
        return (
            <ul>
                { droneList }
            </ul>
        );
    }

    render() {
        return (
            <div className="showAndConnect">
                <button onClick={this._searchForDrones}>Search for drones</button>
                { this._showDrones() }
            </div>
        );
    }
}

export default ShowAndConnect;
