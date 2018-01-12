import * as React from 'react';
import { Jumbotron } from 'react-bootstrap'
const logo = require('./../logo.svg');


class Header extends React.Component<{}, {}> {
    render() {
        return (
            <Jumbotron className="jumboHeader">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcometo React Audio Visualizer</h2>
                <p>Click play on controls to start with default visualization. Click different examples for different visualizations</p>
            </Jumbotron>
        );
    }
}

export default Header;