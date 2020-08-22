import { Design } from '../../src/design';
import '../../src/scss/index.scss';

console.log( 'Test Design' );

const design = new Design();

document.body.appendChild( design.dom() );
