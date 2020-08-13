import { CompPanelItem } from './comp-panel-item';
import { $q } from './utils';

class CompPanel {

    constructor() {

        this.element = $q( '#comp-panel' );

        const comp1 = new CompPanelItem( { name:'Radio Button List'} );
        const comp2 = new CompPanelItem( { name: 'Textbox' } );

        this.element.appendChild( comp1.dom() );
        this.element.appendChild( comp2.dom() );
    }

    dom() {

        return this.element;
    }
}

export {

    CompPanel
};