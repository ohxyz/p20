import { Circle } from './circle';

function testCircle( g ) {

    console.log( 'Test Cirlcle' );

    const c1 = new Circle( 100, 100, 44 );
    c1.draw( g.canvas.context, 'yellow', 1 );
}

export { testCircle };