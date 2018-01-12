import * as React from 'react';
import Props from './../interfaces/iProp';
// import State from './../interfaces/iState';
import { Button, Grid, Row, Col } from 'react-bootstrap';

const test = require('./../test.mp3');

interface State {
    circle: Function;
    spikes: Function;
    bars: Function;
    circleBars: Function;

}

export default class Visualizer extends React.Component<Props, State> {
    private _context:any
    private _audio: any;
    private _audioSrc:any
    constructor(props: Props) {
        super(props);
        this.createVisualization = this.createVisualization.bind(this);
        this.state = {
            circle: this.circles.bind(this),
            spikes: this.circleSpikes.bind(this),
            bars: this.bars.bind(this),
            circleBars: this.circleWithBars.bind(this)
        }


    }

    componentDidMount() {
        // this.createVisualization();
        // fetch('https://api.soundcloud.com/resolve.json?url=https://soundcloud.com/carlrball/softsilence-like-a-king-mix-5&client_id=b1495e39071bd7081a74093816f77ddb', {
        //     method: 'GET',
        //     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         this.setState({
        //             value: data.id,
        //             uri: data.stream_url
        //         })
        //     });
        this._context = new AudioContext();

        this._audio = this.refs.player as HTMLMediaElement;
        this._audio.crossOrigin = 'anonymous';
        this._audioSrc = this._context.createMediaElementSource(this._audio);
    }

    createVisualization(example: Function) {

        // let context = new AudioContext();
        let analyser = this._context.createAnalyser();
        let analyser2 = this._context.createAnalyser();
        analyser2.smoothingTimeConstant = 0.1;



        let canvas = this.refs.analyzerCanvas as HTMLCanvasElement;
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // let audio = this.refs.player as HTMLMediaElement;
        // audio.crossOrigin = 'anonymous';
        // let audioSrc = this._context.createMediaElementSource(audio);

        this._audioSrc.connect(analyser);
        this._audioSrc.connect(analyser2);
        this._audioSrc.connect(this._context.destination);
        analyser.connect(this._context.destination);

        let renderFrame = () => {
            let freqData: Uint8Array = new Uint8Array(analyser.frequencyBinCount);
            let freqData2: Uint8Array = new Uint8Array(analyser2.frequencyBinCount);
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(freqData);
            analyser2.getByteFrequencyData(freqData2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            example(ctx, canvas, freqData);

        };
        renderFrame();
    }

    circleWithBars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 200;
        // ctx.fillStyle = '#ff22aa';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000';
        // let radius: number = 2;
        let offset: number = 200;

        ctx.fillStyle = 'rgba(255, 34, 170, ' + freqData[500] / 256 + ')';
        ctx.arc(canvas.width * 0.5, canvas.height * 0.5, offset, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        for (let i: number = 0; i < num; i++) {

            let rX1: number = canvas.width * 0.5 + (offset + freqData[i]) * Math.cos(2 * Math.PI * (i + 1) / num);
            let rY1: number = canvas.height * 0.5 + (offset + freqData[i]) * Math.sin(2 * Math.PI * (i + 1) / num);

            let rX2: number = canvas.width * 0.5 + (offset) * Math.cos(2 * Math.PI * (i + 1) / num);
            let rY2: number = canvas.height * 0.5 + (offset) * Math.sin(2 * Math.PI * (i + 1) / num);

            // // radius = (freqData[i] / 20);
            // let x: number = rX + (freqData[i]);
            // let y: number = rY + (freqData[i]);
            ctx.beginPath();
            // ctx.arc(rX, rY, radius, 0, 2 * Math.PI);
            ctx.moveTo(rX1, rY1);
            ctx.lineTo(rX2, rY2);
            // ctx.moveTo(rX, rY)            
            ctx.fill();
            ctx.stroke();
        }
    }

    circles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 16;
        for (let i: number = 0; i < num; i++) {
            let x: number = 20 + i * 50;
            let y: number = (freqData[i]);
            let radius: number = (freqData[i] / 10);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        }
    }

    circleOfCircles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 300;
        ctx.fillStyle = '#ff22aa';
        ctx.lineWidth = 0;
        let radius: number = 2;
        let offset: number = 100;

        // ctx.fillStyle = "rgba(255, 34, 170, " + freqData[500] / 256 + ")";
        //     ctx.arc(canvas.width * 0.5, canvas.height * 0.5, offset, 0, 2 * Math.PI);
        //     ctx.fill();
        //     ctx.stroke();
        for (let i: number = 0; i < num; i++) {

            let rX: number = canvas.width * 0.5 + (offset + freqData[i]) * Math.cos(2 * Math.PI * (i + 1) / num);
            let rY: number = canvas.height * 0.5 + (offset + freqData[i]) * Math.sin(2 * Math.PI * (i + 1) / num);

            // radius = (freqData[i] / 20);
            // let x: number = rX + (freqData[i]);
            // let y: number = rY + (freqData[i]);
            ctx.beginPath();
            ctx.arc(rX, rY, radius, 0, 2 * Math.PI);
            ctx.fill();

        }
        ctx.stroke();
    }

    grid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData2: Uint8Array) {
        // let colors: Array<string> = ['#ffffff', '#000000'];
        // let randColor = colors[Math.floor(Math.random() * colors.length)];
        let num: number = 20;
        let radius: number = 10;
        for (let sx: number = 0; sx < num; sx++) {
            for (let sy: number = 0; sy < num; sy++) {
                // if (freqData[sx] >= 250) {
                //     // let randColor = colors[Math.floor(Math.random() * colors.length)];
                //     ctx.fillStyle = randColor;
                //     ctx.strokeStyle = randColor;
                //     radius = (freqData[sx] / 10);
                // } else {
                //     radius = (freqData[sx] / 30);
                // }

                radius = (freqData2[sx] / 25);
                let x: number = 20 + sx * 30;
                let y: number = 20 + sy * 30;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
                // ctx.fillStyle = randColor;
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            }
        }
    }

    randomPos(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 50;
        let ranX: number = Math.floor(Math.random() * canvas.width);
        let ranY: number = Math.floor(Math.random() * canvas.height);
        let radius: number = 0;
        for (let i: number = 0; i < num; i++) {
            if (freqData[i] >= 200) {
                radius = (freqData[i] / 10);
            } else {
                radius = (freqData[i] / 30);
            }
            let x: number = ranX;
            let y: number = ranY;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        }
    }

    bars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        ctx.fillStyle = '#9933ff';
        let bars: number = 500;
        for (var i: number = 0; i < bars; i++) {
            let barX: number = i * 3;
            let barWidth: number = 2;
            let barHeight: number = -(freqData[i] / 2);
            ctx.fillRect(barX, canvas.height * 0.5, barWidth, barHeight);
        }
    }

    circleSpikes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 300;
        ctx.fillStyle = '#b19cd9';
        ctx.beginPath();
        // ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        for (let i: number = 0; i < num; i++) {

            // let x1: number = canvas.width * 0.5 + 25 * Math.cos(2 * Math.PI * i / num);
            // let y1: number = canvas.height * 0.5 + 25 * Math.sin(2 * Math.PI * i / num);
            // ctx.moveTo(x1, y1);

            let rX: number = canvas.width * 0.5 + (freqData[i + 150]) * Math.cos(2 * Math.PI * i / num);
            let rY: number = canvas.height * 0.5 + (freqData[i + 150]) * Math.sin(2 * Math.PI * i / num);
            ctx.lineTo(rX, rY);

            // let x2: number = canvas.width * 0.5 + 25 * Math.cos(2 * Math.PI * (i + 1) / num);
            // let y2: number = canvas.height * 0.5 + 25 * Math.sin(2 * Math.PI * (i + 1) / num);
            // ctx.moveTo(x2, y2);
        }

        ctx.stroke();
        ctx.fill();

        // ctx.beginPath();
        ctx.fillStyle = '#ff22aa';
        // ctx.lineWidth = 1;
        ctx.closePath();

        // ctx.globalAlpha = 0.2;
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
                        <Col lg={3}>
                            <Button bsStyle="primary" onClick={this.createVisualization.bind(this, this.state.circle)}>Example-1</Button>
                        </Col>
                        <Col lg={3}>
                            <Button bsStyle="primary" onClick={this.createVisualization.bind(this, this.state.spikes)}>Example-2</Button>
                        </Col>
                        <Col lg={3}>
                            <Button bsStyle="primary" onClick={this.createVisualization.bind(this, this.state.bars)}>Example-3</Button>
                        </Col>
                        <Col lg={3}>
                            <Button bsStyle="primary" onClick={this.createVisualization.bind(this, this.state.circleBars)}>Example-4</Button>
                        </Col>
                        <Col className="audio-container" lg={12}>
                            <audio controls ref="player" className="player" preload="false">
                                <source className="source" src={test} />
                            </audio>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}