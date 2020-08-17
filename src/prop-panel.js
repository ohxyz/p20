import { $c } from './utils';

class PropPanel {

    constructor() {

        this.element = $c( '<div id="prop-panel" class="prop-panel">' );
    }

    dom() {

        return this.element;
    }
}

export { PropPanel }