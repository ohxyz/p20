import { rgba } from './utils';

function testUtils() {

    console.log( 'Test Utils' );

    const frag = $c( '<div id="a"><div id="aa">aa</div></div>' );

    const range = document.createRange();
    const parent = frag.querySelector( '#a' );

    document.body.appendChild( frag );
}

export { testUtils }