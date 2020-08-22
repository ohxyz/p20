import { $c } from './utils';

class Page {

    constructor() {

        this.element = $c( `
            <div class="page">
                <div class="page__row">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
                <div class="page__row">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
                <div class="page__row">
                    <div class="placeholder"></div>
                </div>
            </div>
        ` );
    }

    dom() {

        return this.element;
    }
}

export { Page };