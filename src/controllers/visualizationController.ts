export default class VisualizationController {
    
    public static bars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        ctx.fillStyle = '#9933ff';
        let bars: number = 500;
        for (var i: number = 0; i < bars; i++) {
            let barX: number = i * 3;
            let barWidth: number = 2;
            let barHeight: number = -(freqData[i] / 2);
            ctx.fillRect(barX, canvas.height * 0.5, barWidth, barHeight);
        }
    }

    public static circles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData2: Uint8Array) {
        let num: number = 32;
        for (let i: number = 0; i < num; i++) {
            let x: number = 30 + i * 50;
            let y: number = (freqData2[i] * 2);
            let radius: number = (freqData2[i] / 10);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
            ctx.closePath();
            ctx.stroke();

        }
    }

    public static circleWithBars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 200;
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000';
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

            ctx.beginPath();

            ctx.moveTo(rX1, rY1);
            ctx.lineTo(rX2, rY2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }          
    }

    public static circleOfCircles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 300;
        ctx.fillStyle = '#ff22aa';
        ctx.lineWidth = 0;
        let radius: number = 2;
        let offset: number = 100;

        for (let i: number = 0; i < num; i++) {

            let rX: number = canvas.width * 0.5 + (offset + freqData[i]) * Math.cos(2 * Math.PI * (i + 1) / num);
            let rY: number = canvas.height * 0.5 + (offset + freqData[i]) * Math.sin(2 * Math.PI * (i + 1) / num);
            ctx.beginPath();
            ctx.arc(rX, rY, radius, 0, 2 * Math.PI);
            ctx.fill();

        }
        ctx.stroke();
        ctx.closePath();
    }

    public static grid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData2: Uint8Array) {
        let num: number = 40;
        let radius: number = 10;
        for (let sx: number = 0; sx < num; sx++) {
            for (let sy: number = 0; sy < num; sy++) {
                radius = (freqData2[sx] / 30);
                let x: number = 20 + sx * 30;
                let y: number = 20 + sy * 15;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            }
        }
    }

    public static randomPos(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 50;
        let ranX: number = Math.floor(Math.random() * canvas.width);
        let ranY: number = Math.floor(Math.random() * canvas.height);
        let radius: number = 0;
        for (let i: number = 0; i < num; i++) {
            if (freqData[i] >= 200) {
                radius = 25
            } else {
                radius = 5;
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

    public static circleSpikes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, freqData: Uint8Array) {
        let num: number = 300;
        ctx.fillStyle = '#b19cd9';
        ctx.beginPath();
        ctx.lineWidth = 3;
        for (let i: number = 0; i < num; i++) {

            let rX: number = canvas.width * 0.5 + (freqData[i + 150]) * Math.cos(2 * Math.PI * i / num);
            let rY: number = canvas.height * 0.5 + (freqData[i + 150]) * Math.sin(2 * Math.PI * i / num);
            ctx.lineTo(rX, rY);
        }
        ctx.closePath();
        
        ctx.stroke();

        ctx.fill();

        ctx.fillStyle = '#ff22aa';
    }
}