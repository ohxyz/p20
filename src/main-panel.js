import { $q } from './utils';

class MainPanel {

    constructor() {

        this.container = $q( '#main-panel' );
        this.componentHolders = [];
    }

    addComponentHolder( hc ) {

        this.componentHolders.push( hc );
        this.element.appendChild( hc.dom() );
    }

    dom() {

        return this.container;
    }
}

export {

    MainPanel
};