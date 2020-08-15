import { $c } from '../utils';

class ShowViewportCoordsTool {

    constructor() {

        this.element = $c('<div id="show-viewport-coords">Client X: n/a, Client Y: n/a</div>');

        document.addEventListener( 'mousemove', event => {

            const x = event.clientX;
            const y = event.clientY;

            this.element.innerText = `Client X: ${x}, Client Y: ${y}`;
        } );
    }

    dom() {

        return this.element;
    }
}

export { ShowViewportCoordsTool };