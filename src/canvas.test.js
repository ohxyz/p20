import { Canvas } from './canvas';

function testCanvas() {

    globalThis.canvas.drawColStripes( 10, '#ff000022');
    globalThis.canvas.drawGridLines( 30, '#00000080' );
}

export { testCanvas };