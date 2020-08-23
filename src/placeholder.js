import { $c } from './utils';
import { Box } from './box';

class Placeholder extends Box {

    constructor() {

        const element = $c( '<div class="placeholder">' );

        super( element );

        this.element = element;
        this.removeButton = $c( '<button class="placeholder__remove">x</button>' );
        this.element.appendChild( this.removeButton );

        this.removeButton.addEventListener( 'click', this.handleRemoveButtonClick.bind(this) );
    }

    handleRemoveButtonClick() {

        this.remove();
    }

    remove() {

        this.element.remove();
    }
}

export { Placeholder };