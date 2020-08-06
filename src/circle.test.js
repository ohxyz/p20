import { Circle } from './circle';

function testCircle( context ) {

    console.log( 'Test Cirlcle' );

    const c1 = new Circle( 100, 100, 44 );
    c1.draw( context );
    
}

export { testCircle };