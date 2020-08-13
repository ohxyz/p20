import { $ce } from './utils';

class CompPanelItem {

    constructor( args={}  ) {

        const { name='Unknown' } = args;

        this.element = $ce( 'div' );
        this.element.classList.add( 'comp' );
        this.element.innerText = name;
    }

    dom() {

        return this.element;
    }
}

export {

    CompPanelItem
};