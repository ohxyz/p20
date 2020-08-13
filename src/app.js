import { $q } from './utils';
import { DnrManager } from './dnr-manager';

class App {

    element;
    chm;

    constructor( { mainPanel } ) {

        this.element = $q( '#app' );

        window.addEventListener( 'resize', this.handleResize.bind(this) );
    }

    handleResize() {
        
    }

    dom() {

        return this.element;
    }
}

export {

    App
};