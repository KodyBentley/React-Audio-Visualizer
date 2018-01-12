import * as React from 'react';
import Visualizer from './components/visualizerComponent';
import Props from './interfaces/iProp';
import State from './interfaces/iState';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Audio Visualizer</h2>
        </div>
        <Visualizer />

      </div>
    );
  }
}

export default App;
