import { Dnr } from './dnr';

function testMainPanel( g ) {

    console.log( 'Test MainPanel' );
    // g.mainPanel.dom().style.backgroundColor = 'red';

    const ch = new Dnr();
    g.mainPanel.dom().appendChild( ch.dom() );
}

export {

    testMainPanel
};