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
                    <h1 className="App-title">Velkommen til Flappy Drone!</h1>
                </header>
                <p className="App-intro">
                </p>
                <ShowAndConnect />
                <script src="%PUBLIC_URL%/socket.io.js"/>
                <footer className="App-footer">
                    Laget av Gruppe 2 med Jonas, Lars, Ingrid og Sondre
                </footer>
            </div>
        );
    }
}

export default App;
