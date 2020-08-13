import { $q } from './utils';
import { DnrManager } from './dnr-manager';

class App {

    element;
    chm;
    mainPanel;
    compPanel;

    constructor( { mainPanel, compPanel } ) {

        this.element = $q( '#app' );
        this.mainPanel = mainPanel;
        this.compPanel = compPanel;

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