import { Dnr } from './dnr';
import { DnrManager } from './dnr-manager';

let mgr = null;

function testDnrManager() {

    console.log( 'Test DnrManager' );
    // g.mainPanel.dom().style.backgroundColor = 'red';

    const ch = new Dnr( {

        x: 0,
        y: 0,
        id: 'a', 
        backgroundColor: '#ff000050'
    } );

    const ch2 = new Dnr( {

        x: 0,
        y: 400,
        id: 'b', 
        backgroundColor: '#0000ff50'
    } );

    mgr = new DnrManager( { container: globalThis.mainPanel.dom() } );

    mgr.add( ch );
    mgr.add( ch2 );
    
    ch2.x = 5;
}

function testDnrManagerTearDown( g ) {

    if ( !mgr ) { return; }

    mgr.clear();
}

export {

    testDnrManager,
    testDnrManagerTearDown
};