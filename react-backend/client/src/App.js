import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var test = require("./test.js")

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          hi
        </p>
        <button onClick={test.output}> test </button>
      </div>
    );
  }
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
</header>
*/
