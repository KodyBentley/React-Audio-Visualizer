import * as React from 'react';
import Props from './../interfaces/iProp';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import VisController from './../controllers/visualizationController';

const audio = require('./../test.mp3');

interface State {
    circle: Function;
    spikes: Function;
    bars: Function;
    circleBars: Function;
    grid: Function;
    circleOfCircles: Function;
    randomPos: Function;
    updateFunction: Function;

}

export default class Visualizer extends React.Component<Props, State> {
    private _context: AudioContext;
    private _audio: HTMLMediaElement;
    private _audioSrc: MediaElementAudioSourceNode;
    constructor(props: Props) {
        super(props);
        this.createVisualization = this.createVisualization.bind(this);
        this.state = {
            circle: VisController.circles.bind(this),
            spikes: VisController.circleSpikes.bind(this),
            bars: VisController.bars.bind(this),
            circleBars: VisController.circleWithBars.bind(this),
            grid: VisController.grid.bind(this),
            circleOfCircles: VisController.circleOfCircles.bind(this),
            randomPos: VisController.randomPos.bind(this),
            updateFunction: VisController.bars.bind(this)
        };

    }

    componentDidMount() {
        this._context = new AudioContext();

        this._audio = this.refs.player as HTMLMediaElement;
        this._audio.crossOrigin = 'anonymous';
        this._audioSrc = this._context.createMediaElementSource(this._audio);
        this.createVisualization();

    }

    createVisualization() {

        let analyser = this._context.createAnalyser();
        let analyser2 = this._context.createAnalyser();
        analyser2.smoothingTimeConstant = 0.1;

        let canvas = this.refs.analyzerCanvas as HTMLCanvasElement;
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._audioSrc.connect(analyser);
        this._audioSrc.connect(analyser2);
        this._audioSrc.connect(this._context.destination);
        analyser.connect(this._context.destination);

        let renderFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let freqData: Uint8Array = new Uint8Array(analyser.frequencyBinCount);
            let freqData2: Uint8Array = new Uint8Array(analyser2.frequencyBinCount);
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(freqData);
            analyser2.getByteFrequencyData(freqData2);

            this.state.updateFunction(ctx, canvas, freqData);

        };
        renderFrame();
    }

    changeState(f: Function) {
        this.setState({
            updateFunction: f
        });
    }

    render() {
        let height = window.innerHeight / 1.5;
        let width = window.innerWidth;
        return (
            <div className="audio-vis-container">
                <canvas
                    ref="analyzerCanvas"
                    id="analyzer"
                    className="canvas"
                    height={height}
                    width={width}
                />
                <Grid>
                    <Row>
                        <Col className="example-row-1" lg={12}>
                            <Col lg={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.circle)}>Example-1</Button>
                            </Col>
                            <Col lg={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.grid)}>Example-2</Button>
                            </Col>
                            <Col lg={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.circleOfCircles)}>Example-3</Button>
                            </Col>
                            <Col lg={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.circleBars)}>Example-4</Button>
                            </Col>
                        </Col>
                        <Col className="example-row-1" lg={12}>
                            <Col lg={3} lgPush={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.circleBars)}>Example-4</Button>
                            </Col>
                            <Col lg={3} lgPush={3}>
                                <Button bsStyle="primary" onClick={this.changeState.bind(this, this.state.spikes)}>Example-5</Button>
                            </Col>
                        </Col>
                        <Col className="audio-container" lg={12}>
                            <audio controls ref="player" className="player" preload="false">
                                <source className="source" src={audio} />
                            </audio>
                        </Col>
                    </Row>
                </Grid>
            </div >
        );
    }
}