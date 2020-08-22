import { $c } from './utils';
import { Box } from './box';

class Design extends Box {

    constructor() {

        const element = $c( `
            <div class="design">
                <div class="design__row">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
                <div class="design__row">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
                <div class="design__row">
                    <div class="placeholder"></div>
                </div>
            </div>
        ` );

        super( element );

        this.element = element;
    }

    dom() {

        return this.element;
    }
}

export { Design };