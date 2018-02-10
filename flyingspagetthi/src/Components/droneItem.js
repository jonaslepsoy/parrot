import React, {Component} from 'react';


class DroneItem extends Component {


    componentDidMount() {
    }


    render() {
        return (
            <div className="showAndConnect">
                <p>{this.props.drone.name}</p>
            </div>
        );
    }
}

export default DroneItem;
