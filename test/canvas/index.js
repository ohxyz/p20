import { Canvas } from '../../src/canvas';

const canvas = new Canvas( { id: 'canvas', width: 500, height: 500 } );

document.body.appendChild( canvas.dom() );

canvas.drawColStripes( 10, '#ff000022');
canvas.drawGridLines( 30, '#00000080' );

