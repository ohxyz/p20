import { Canvas } from './canvas';

function testCanvas( g ) {

    g.canvas.drawColStripes( 10, '#ff000022');
    g.canvas.drawGridLines( 30, '#00000080' );
}

export { testCanvas };