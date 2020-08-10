import { $cf, genRandomString } from './utils';

/**
 * Draggable and Resizable
 */
class Dnr {

    constructor( args={} ) {

        const {

            id = genRandomString(),
            x = 0,
            y = 0,
            width = 100,
            height = 100,
            backgroundColor = '#00000030',
            
        } = args;

        this.id = id;
        // console.log( '@@ container', this.container )
        this.element = $ce( 'div' );

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
        this.element.style.backgroundColor = backgroundColor;
        this.element.setAttribute( 'dnr-state', 'static' );

        // debug
        this.element.style.border = '5px solid green';
        this.element.style.zIndex = 1000;

    }

    handleClick() {

        console.log( '@@ click', this.id );
    }

    dom() {

        return this.element;
    }
}

export {

    Dnr
};