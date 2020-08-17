import { Box } from '../../src/Box';
import { $q } from '../../src/utils';

const boxA = new Box( $q( '#a' ) );
console.log( boxA );

window.boxA = boxA;