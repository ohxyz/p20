import { isInRect } from './utils';
import { Dnr } from './dnr';

class DnrManager {

    containerElem;
    dnrs = [];
    activeDnr = null;
    // lastHoveredDnr is different from activeDnr. 
    // lastHoveredDnr is to update cursor styles when cursor is over the Dnr's borders
    // Whem mouse moved out of the dnr, it is still calculating the positon of the mouse
    lastHoveredDnr = null;
    // Cursor coords of last movement
    lastX = 0;
    lastY = 0;

    constructor( { container } ) {

        if ( !container ) {
            throw new Error( 'DnrManager must have a DOM elment as a container!' );
        }

        this.containerElem = container;

        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
        document.addEventListener( 'click', this.handleClick.bind(this) );
    }

    add( dnr ) {

        this.dnrs.push( dnr );
        this.containerElem.appendChild( dnr.dom() );
    }

    remove( dnr ) {

        const index = this.dnrs.indexOf( dnr );
        this.dnrs.splice( index, 1 );
        dnr.remove();
    }

    findDnrByElement( elem ) {

        for ( const dnr of this.dnrs ) {

            if ( dnr.dom() === elem ) {
                return dnr;
            }
        }

        return null;
    }

    getAll() {

        return this.dnrs;
    }

    handleMouseDown( event ) {

        const dnr = this.findDnrByElement( event.target );

        if ( dnr && dnr.getState() === 'static' ) {

            // If there are nodes or element, e.g. text in the Dnr
            // then prevent the browser trirgger's default behaviour, e.g select text
            event.preventDefault();

            this.activeDnr = dnr;

            const cursorX = event.clientX;
            const cursorY = event.clientY;

            const borderRects = this.lastHoveredDnr.getBorderRects();

            if ( isInRect( cursorX, cursorY, borderRects.top ) ) {
                this.activeDnr.setState( 'resize-top' );
            }
            else if ( isInRect( cursorX, cursorY, borderRects.right ) ) {
                this.activeDnr.setState( 'resize-right' );
            }
            else if ( isInRect( cursorX, cursorY, borderRects.bottom) ) {
                this.activeDnr.setState( 'resize-bottom' );
            }
            else if ( isInRect( cursorX, cursorY, borderRects.left) ) {
                this.activeDnr.setState( 'resize-left' );
            }
            else {
                this.activeDnr.setState( 'drag' );
            }

        }

        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    handleMouseMove( event ) {

        const dnr = this.findDnrByElement( event.target );

        if ( dnr ) {

            this.lastHoveredDnr = dnr;
        }

        if ( this.lastHoveredDnr ) {

            const cursorX = event.clientX;
            const cursorY = event.clientY;
            const borderRects = this.lastHoveredDnr.getBorderRects();

            if ( isInRect( cursorX, cursorY, borderRects.top ) ) {
                document.body.style.cursor = 'n-resize';
            }
            else if ( isInRect( cursorX, cursorY, borderRects.right ) ) {
                document.body.style.cursor = 'e-resize';
            }
            else if ( isInRect( cursorX, cursorY, borderRects.bottom ) ) {
                document.body.style.cursor = 's-resize';
            }
            else if ( isInRect( cursorX, cursorY, borderRects.left ) ) {
                document.body.style.cursor = 'w-resize';
            }
            else {
                document.body.style.cursor = 'auto';
            }
        }

        if ( this.activeDnr ) {

            // Prevent the browser trirgger's default behaviour, e.g select text
            event.preventDefault();
            
            if ( this.activeDnr.getState() === 'drag' ) {
                this.handleDnrMove( event );
            }
            else if ( this.activeDnr.getState() === 'resize-top' ) {
                this.handleDnrResize( 'top' );
            }
            else if ( this.activeDnr.getState() === 'resize-right' ) {
                this.handleDnrResize( 'right' );
            }
            else if ( this.activeDnr.getState() === 'resize-bottom' ) {
                this.handleDnrResize( 'bottom' );
            }
            else if ( this.activeDnr.getState() === 'resize-left' ) {
                this.handleDnrResize( 'left' );
            }
        }
    }

    handleDnrResize( direction ) {

        const dnrElem = this.activeDnr.dom();
        const distX = event.clientX - this.lastX;
        const distY = event.clientY - this.lastY;
        const top = parseFloat( dnrElem.style.top );
        const left = parseFloat( dnrElem.style.left );
        const width = parseFloat( dnrElem.style.width );
        const height = parseFloat( dnrElem.style.height );

        if ( direction === 'top' ) {

            dnrElem.style.top = top + distY + 'px';
            dnrElem.style.height = height - distY + 'px';
            // Keep cursor style consistent at resizing
            // Otherwise, cursor styles changes when resize
            document.body.style.cursor = 'n-resize';
        }
        else if ( direction === 'right' ) {

            dnrElem.style.width = width + distX + 'px';
            document.body.style.cursor = 'e-resize';
        }
        else if ( direction === 'bottom' ) {

            dnrElem.style.height = height + distY + 'px';
            document.body.style.cursor = 's-resize';
        }
        else if ( direction === 'left' ) {

            dnrElem.style.left = left + distX + 'px';
            dnrElem.style.width = width - distX + 'px';
            document.body.style.cursor = 'w-resize';
        }

        this.lastX = event.clientX;
        this.lastY = event.clientY;

    }

    handleDnrMove( event ) {

        const distX = event.clientX - this.lastX;
        const distY = event.clientY - this.lastY;
        const elem = this.activeDnr.dom();

        const x = parseFloat( elem.style.left );
        const y = parseFloat( elem.style.top );

        elem.style.top = y + distY + 'px' ;
        elem.style.left = x + distX + 'px';

        this.lastX = event.clientX;
        this.lastY = event.clientY;
    }

    handleMouseUp( event ) {

        if ( this.activeDnr ) {

            this.activeDnr.setState( 'static' );
            this.activeDnr = null;
        }
    }

    handleDnrCloseButtonClick( buttonElem ) {

        for ( let i = 0; i < this.dnrs.length; i ++ ) {

            const dnr = this.dnrs[i];

            if ( dnr.dom() === buttonElem.parentElement ) {

                this.dnrs.splice( i, 1 );
                dnr.remove();
                break;
            }
        }
    }

    handleClick( event ) {

        if ( Dnr.isCloseButton( event.target ) ) {
            this.handleDnrCloseButtonClick( event.target );
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