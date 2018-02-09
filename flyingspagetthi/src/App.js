import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RollingSpider from 'rolling-spider';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');



class App extends Component {
    constructor(props) {
        super(props);
        this._searchForDrones = this._searchForDrones.bind(this);
    }
    componentDidMount() {

    }

    _searchForDrones(){
        socket.emit('connection');
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            <button onClick={ this._searchForDrones }>connect</button>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
