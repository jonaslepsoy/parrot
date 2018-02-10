import React, {Component} from 'react';
import ShowAndConnect from './Components/showAndConnect';
import drone from './drone.png';
import './App.css';


class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={drone} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Game of Drones</h1>
                </header>
                <p className="App-intro">
                </p>
                <ShowAndConnect />
                <script src="%PUBLIC_URL%/socket.io.js"/>
            </div>
        );
    }
}

export default App;
