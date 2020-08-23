import { $c, $a } from './utils';
import { Placeholder } from './placeholder';

class DesignRow {

    constructor() {

        this.element = $c( `
            <div class="design__row">
                <div class="design__resize-bar"></div>
            </div>
        ` );

        this.addPhButton = $c( '<button class="design__add-ph">+</button>' );
        this.element.appendChild( this.addPhButton );
        this.addPhButton.addEventListener( 'click', this.handleAddPhButtonClick.bind(this) );
    }

    handleAddPhButtonClick() {

        this.addPlaceholder();
    }

    addPlaceholder() {

        const ph = new Placeholder();
        $a( this.element, ph.dom() );
    }

    setHeight( height, min=0 ) {

        if ( height >= min ) {
            
            this.element.style.height = height + 'px';
        }
    }

    dom() {

        return this.element;
    }
}

export { DesignRow };