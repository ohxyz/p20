import { Page } from '../../src/page';
import '../../src/scss/index.scss';

console.log( 'Test Page' );

const page = new Page();

document.body.appendChild( page.dom() );
