import * as React from 'react';
import Visualizer from './components/visualizerComponent';
import Header from './components/header';
import Props from './interfaces/iProp';
import State from './interfaces/iState';
import './styles/App.css';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Visualizer />
      </div>
    );
  }
}

export default App;
