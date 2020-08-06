import '../scss/index.scss';
import { foo } from './foo';
import { testPoint } from './point.test';
import { testLine } from './line.test';
import { testCircle } from './circle.test';
import { testCollision } from './collision.test';

/* Globals ****************************************************************************************/

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

const modules = {

    'point': testPoint,
    'line': testLine,
    'circle': testCircle,
    'collision': testCollision
}

/* Main *******************************************************************************************/

init();


/* Functions **************************************************************************************/
function clearCanvas() {

    canvasContext.clearRect( 0, 0, canvasElem.width, canvasElem.height );
}

function createTestSuite( moduleName, moduleTestFn ) {

    const button = document.createElement( 'button' );
    button.id = 'test-' + moduleName;
    button.innerText = 'Test ' + moduleName;
    button.addEventListener( 'click', () => {

        clearCanvas();
        localStorage.setItem( 'test', moduleName );
        moduleTestFn( canvasContext );
    } )

    const buttonContainer = document.getElementById( 'top-bar' );
    buttonContainer.appendChild( button );
}

function init() {

    const testItem = localStorage.getItem( 'test' );

    for ( const [testName, testFn] of Object.entries(modules) ) {

        createTestSuite( testName, testFn );

        if ( testItem === testName ) {

            testFn( canvasContext );
        }
    }

}
