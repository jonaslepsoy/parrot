import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//import RollingSpider from 'rolling-spider';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class App extends Component {
    constructor(props) {
        super(props);
        this._searchForDrones = this._searchForDrones.bind(this);
    }

    componentDidMount() {

    }

    _searchForDrones() {
        console.log('Sender emit');
        socket.emit('list');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <button onClick={this._searchForDrones}>connect</button>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <script src="%PUBLIC_URL%/socket.io.js"/>
            </div>
        );
    }
}

export default App;
