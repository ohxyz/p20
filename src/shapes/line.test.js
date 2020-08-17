import { Line } from './line';
import { Point } from './point';

function testLine( context ) {

    console.log( 'Test line' );

    const line1 = new Line( 114, 84, 20, 300 );
    const line2 = new Line( 200, 300, 50, 50 );

    line1.draw( context );
    line2.draw( context );

    const i = Line.calcI( line1, line2 );

    const isCrossed = Line.getI( line1, line2 );

    console.log( '@@ does cross', isCrossed );

    const line3 = new Line( 200, 200, 0.5 );
    line3.color = 'blue';
    line3.drawByK( context );
    line3.drawPLine( context, 'red' );

    Line.drawVLine( context, 400, 0, 500, [5, 5] );
    Line.drawHLine( context, 0, 400, 500, [5, 5] );

}

export { testLine };