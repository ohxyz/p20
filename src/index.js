import '../scss/index.scss';
import { testPoint } from './shapes/point.test';
import { testLine } from './shapes/line.test';
import { testCircle } from './shapes/circle.test';
import { testCollision } from './collision.test';
import { testCanvas } from './canvas.test';
import { testMainPanel } from './main-panel.test';
import { testDnrManager, testDnrManagerTearDown } from './dnr-manager.test';
import { testApp } from './app.test';
import { testUtils } from './utils.test';
import { MainPanel } from './main-panel';
import { CompPanel } from './comp-panel';
import { Canvas } from './canvas';
import { App } from './app';
import { $q } from './utils';

/* Globals ****************************************************************************************/

const compPanel = new CompPanel();

const canvas = new Canvas( { id: 'canvas', width: 500, height: 500 } );
const mainPanel = new MainPanel( { canvas: canvas });
const app = new App( { mainPanel, compPanel });

document.addEventListener( 'mousemove', event => {

    const infoElem = document.getElementById( 'info' );

    // if ( event.target === canvas.dom() ) {

    //     const canvasX = event.offsetX;
    //     const canvasY = event.offsetY;

    //     infoElem.innerText = `Canvas X: ${canvasX}, Canvas Y: ${canvasY}`;
    //     return;
    // }

    const x = event.clientX;
    const y = event.clientY;

    infoElem.innerText = `Client X: ${x}, Client Y: ${y}`;
} );

$q( '#update-main-form' ).addEventListener( 'submit', event => {

    event.preventDefault();
    const w = $q( '#main-width' ).value;
    const h = $q( '#main-height' ).value;

    mainPanel.update( { width: w, height: h } );
    mainPanel.reposition();
;} )

const modules = {

    'dnr-manager': testDnrManager,
    'dnr-manager-clear': testDnrManagerTearDown,
    'test-app': testApp,
    'main-panel': testMainPanel,
    'canvas': testCanvas,
    'utils': testUtils
    // 'point': testPoint,
    // 'line': testLine,
    // 'circle': testCircle,
    // 'collision': testCollision,
};

globalThis.canvas = canvas;
globalThis.mainPanel = mainPanel;
globalThis.app = app;

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
        moduleTestFn();
    } )

    const buttonContainer = document.getElementById( 'buttons' );
    buttonContainer.appendChild( button );
}

function init() {

    const testItem = localStorage.getItem( 'test' );

    for ( const [testName, testFn] of Object.entries(modules) ) {

        createTestSuite( testName, testFn );

        if ( testItem === testName ) {
            
            testFn();
        }
    }
}
