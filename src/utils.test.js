import { rgba, $c } from './utils';

console.log( 'Test Utils' );

const frag = $c( '<div id="a"><div id="aa">bb</div></div>' );

const range = document.createRange();
const parent = frag.querySelector( '#a' );

document.body.appendChild( frag );


