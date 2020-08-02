import { Line } from './line';
import { Point } from './point';

function testLine( context ) {

    console.log( 'Test line' );

    const line1 = new Line( 80, 150, 20, 300 );
    const line2 = new Line( 200, 300, 50, 50 );

    line1.draw( context );
    line2.draw( context );

    const k1 = line1.getK();
    const k2 = line2.getK();
    const i = Line.getI( line1, line2 );

    const isCross = Line.doesCross( line1, line2 );

    console.log( '@@', isCross );

}

export { testLine };