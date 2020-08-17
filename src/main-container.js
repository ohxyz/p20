import { $c } from './utils';

class MainContainer {

    constructor() {

        this.element = $c( '<div class="main-container">' );
    }

    dom() {

        return this.element;
    }
}

export { MainContainer }