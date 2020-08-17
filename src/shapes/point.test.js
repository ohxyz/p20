import { Point } from './point';

function testPoint( context ) {

    console.log( 'Test Point' );

    const p1 = new Point( 10, 10 );
    p1.draw( context );

    const dist = Point.getDist( p1.x, p1.y, 13, 14 );
    console.log( '@@ dist', dist );

    Point.drawRect( context, 50, 50, 77, 66, [10, 10] );
}

export { testPoint };