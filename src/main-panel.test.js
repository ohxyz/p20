import { Dnr } from './dnr';

function testMainPanel() {

    console.log( 'Test MainPanel' );

    const ch = new Dnr( {

        x: 0,
        y: 0,
        id: 'a', 
        backgroundColor: '#00ff0050',
        text: 'main 1'
    } );

    const ch2 = new Dnr( {

        x: 50,
        y: 400,
        id: 'b', 
        backgroundColor: '#00ffff30',
        text: 'main 2'
    } );

    globalThis.mainPanel.addComponentHolder( ch, ch2 );

    // g.mainPanel.add( ch2 );
}

export {

    testMainPanel
};