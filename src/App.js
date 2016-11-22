import React, { Component } from 'react';
import Dispatcher from './components/Dispatcher';
import Top from './components/Top';

class App extends Component {
  render() {
    return (
      <div>
        <Top/>
        <Dispatcher/>
      </div>
    );
  }
}

export default App;
