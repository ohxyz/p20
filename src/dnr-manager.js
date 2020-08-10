class DnrManager {

    constructor( { container } ) {

        if ( !container ) {
            throw new Error( 'DnrManager must have a DOM elment as a container!' );
        }

        this.containerElem = container;
        this.dnrs = [];
        this.activeDnrElem = null;
        // Cursor mouse since last movement
        this.prevX = 0;
        this.prevY = 0;

        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
    }

    add( dnr ) {

        this.dnrs.push( dnr );
        this.containerElem.appendChild( dnr.dom() );
    }

    getAll() {

        return this.dnrs;
    }

    handleMouseDown( event ) {

        // console.log( '@@ mouse down', event.target  );

        if ( event.target.getAttribute( 'dnr-state' ) === 'static' ) {

            // console.log( 'dnr' );
            this.activeDnrElem = event.target;
            this.activeDnrElem.setAttribute( 'dnr-state', 'drag' );

            this.prevX = event.clientX;
            this.prevY = event.clientY;
        }
    }

    handleMouseMove( event ) {

        // console.log( '@@ mouse move', event.target  );

        if ( this.activeDnrElem && this.activeDnrElem.getAttribute( 'dnr-state', 'drag' ) ) {

            // console.log( 'drag' )

            const distX = event.clientX - this.prevX;
            const distY = event.clientY - this.prevY;

            const x = parseInt( this.activeDnrElem.style.left );
            const y = parseInt( this.activeDnrElem.style.top );

            this.activeDnrElem.style.top = y + distY + 'px' ;
            this.activeDnrElem.style.left = x + distX + 'px';

            this.prevX = event.clientX;
            this.prevY = event.clientY;
        }
    }

    handleMouseUp( event ) {
        // console.log( '@@ mouse up' );
        // this.isDragStarted = false;

        if ( this.activeDnrElem && this.activeDnrElem.getAttribute( 'dnr-state', 'drag' ) ) {

            this.activeDnrElem.setAttribute( 'dnr-state', 'static' );
            this.activeDnrElem = null;
        }
    }

    clear() {

        for ( const dnr of this.dnrs ) {
            dnr.dom().remove();
        }

        this.dnrs = [];
    }
}

export { DnrManager }