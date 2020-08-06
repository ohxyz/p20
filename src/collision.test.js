import { Line, Circle } from './shape';
import { collideCircleLine } from './collision';

function testCollision( context ) {

    console.log( 'Test Collision' );

    const cx1 = 77;
    const cy1 = 88;
    const circle1 = new Circle( cx1, cy1, 50 );
    circle1.draw( context );

    const cx2 = 144;
    const cy2 = 277;
    const circle2 = new Circle( cx2, cy2, 88 );
    circle2.draw( context );

    const line1 = new Line( 30, 300, 300, 30 );
    line1.draw( context );
    line1.drawPLineByPoint( context, cx1, cy1, 'blue' );
    line1.drawPLineByPoint( context, cx2, cy2, 'red' );

    const doesCollide1 = collideCircleLine( circle1, line1 );
    const doesCollide2 = collideCircleLine( circle2, line1 );

    console.log( '@@ collide with circle1?', doesCollide1 );
    console.log( '@@ collide with circle2?', doesCollide2 );

}

export { testCollision };