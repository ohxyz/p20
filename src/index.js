import '../scss/index.scss';
import { testPoint } from './shapes/point.test';
import { testLine } from './shapes/line.test';
import { testCircle } from './shapes/circle.test';
import { testCollision } from './collision.test';
import { testCanvas } from './canvas.test';
import { testMainPanel } from './main-panel.test';
import { MainPanel } from './main-panel';
import { Canvas } from './canvas';

/* Globals ****************************************************************************************/

const infoElem = document.getElementById( 'info' );

const canvas = new Canvas( { id: 'canvas', width: 500, height: 500 } );
const mainPanel = new MainPanel();

canvas.dom().addEventListener( 'mousemove', event => {

    const canvasX = event.offsetX;
    const canvasY = event.offsetY;
    infoElem.innerText = `X: ${canvasX}, Y: ${canvasY}`;

} );


const modules = {

    'main-panel': testMainPanel,
    'canvas': testCanvas,
    'point': testPoint,
    'line': testLine,
    'circle': testCircle,
    'collision': testCollision,
};

const globalContext = {

    canvas: canvas,
    mainPanel: mainPanel
};

/* Main *******************************************************************************************/

init();


/* Functions **************************************************************************************/

function createTestSuite( moduleName, moduleTestFn ) {

    const button = document.createElement( 'button' );
    button.id = 'test-' + moduleName;
    button.innerText = 'Test ' + moduleName;
    button.addEventListener( 'click', () => {

        canvas.clear();
        localStorage.setItem( 'test', moduleName );
        moduleTestFn( globalContext );
    } )

    const buttonContainer = document.getElementById( 'buttons' );
    buttonContainer.appendChild( button );
}

function init() {

    const testItem = localStorage.getItem( 'test' );

    for ( const [testName, testFn] of Object.entries(modules) ) {

        createTestSuite( testName, testFn );

        if ( testItem === testName ) {
            
            testFn( globalContext );
        }
    }
}
