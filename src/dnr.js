import { $cf, genRandomString } from './utils';

/**
 * Draggable and Resizable
 */
class Dnr {

    constructor( args={} ) {

        const {

            x = 150,
            y = 150,
            width = 100,
            height = 100,
            backgroundColor = '#0000ff30',
            container
        
        } = args;

        this.id = genRandomString();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;

        // console.log( '@@ container', this.container )
        this.element = $ce( 'div' );

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.backgroundColor = this.backgroundColor;

        // debug
        this.element.style.border = '5px solid green';
        this.element.style.zIndex = 1000;

        this.element.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
    }

    handleMouseDown( event ) {

        // console.log( '@@ mouse down', event.offsetX, event.offsetY  );

        this.isDragStarted = true;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    handleMouseMove( event ) {

        if ( !this.isDragStarted ) {
            return;
        }
        // console.log( '@@ mouse move' );
        const distX = event.clientX - this.lastX;
        const distY = event.clientY - this.lastY;
        // console.log( this.x, this.y, distX, distY );
        this.x += distX;
        this.y += distY;
        this.element.style.top = this.y + 'px' ;
        this.element.style.left = this.x + 'px';

        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    handleMouseUp( event ) {
        // console.log( '@@ mouse up' );
        this.isDragStarted = false;
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