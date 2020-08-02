import '../scss/index.scss';
import { foo } from './foo';
import { testPoint } from './point.test';
import { testLine } from './line.test';

const infoElem = document.getElementById( 'info' );

const canvasElem = document.getElementById( 'canvas' );
const canvasContext = canvasElem.getContext( '2d' );

canvasElem.width = 500;
canvasElem.height = 500;

canvasElem.addEventListener( 'mousemove', event => {

    const canvasX = event.offsetX;
    const canvasY = event.offsetY;
    infoElem.innerText = `X: ${canvasX}, Y: ${canvasY}`;

} );

const testPointButton = document.getElementById( 'test-point' );

testPointButton.addEventListener( 'click', () => {

    clearCanvas();
    localStorage.setItem( 'test', 'point' );
    testPoint( canvasContext );
} );

const testLineButon = document.getElementById( 'test-line' );

testLineButon.addEventListener( 'click', () => { 

    clearCanvas();
    localStorage.setItem( 'test', 'line' );
    testLine( canvasContext );
} );

const testItem = localStorage.getItem( 'test' );

if ( testItem == 'line' ) {

    testLine( canvasContext );
}
else if ( testItem == 'point' ) {

    testPoint( canvasContext );
}

function clearCanvas() {

    canvasContext.clearRect( 0, 0, canvasElem.width, canvasElem.height );
}
