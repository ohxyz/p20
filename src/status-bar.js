import { $q } from './utils';
import { ShowViewportCoordsTool } from './tools/show-viewport-coords';
import { ShowDnrCoordsTool } from './tools/show-dnr-coords';

class StatusBar {

    constructor( { mainPanel } ) {

        this.element = $q( '#status-bar' );
        this.showViewportCoordsTool = new ShowViewportCoordsTool();
        this.showDnrCoordsTool = new ShowDnrCoordsTool( { mainPanel } );

        this.element.appendChild( this.showViewportCoordsTool.dom() );
        this.element.appendChild( this.showDnrCoordsTool.dom() );
    }

    dom() {

        return this.element;
    }
}

export { StatusBar };