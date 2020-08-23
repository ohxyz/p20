import { $c, $a, $q } from './utils';
import { Box } from './box';
import { DesignRow } from './design-row';
import g from './globals';

class Design extends Box {

    lastX = 0;
    lastY = 0;

    constructor() {

        const element = $c( `
            <div class="design">
                <button class="design__add-row">+</button>
            </div>
        ` );

        super( element );

        this.rows = [];
        this.activeRowElement = null;
        this.element = element;
        this.addRowButton = $q( '.design__add-row', this.element );
        this.addRowButton.addEventListener( 'click', this.handleAddRowButtonClick.bind(this) );

        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );

        this.addRow();
    }

    handleAddRowButtonClick() {

        this.addRow();
    }

    handleMouseDown( event ) {

        if ( event.target.classList.contains( 'design__resize-bar' ) ) {

            this.handleRowResizeStart( event );
        }
    }

    handleMouseUp( event ) {

        this.handleRowResizeEnd();
    }

    handleMouseMove( event ) {

        if ( this.activeRowElement ) {

            this.handleRowResize( event );
        }
    }

    handleRowResizeStart( event ) {

        this.activeRowElement = event.target.parentElement;
        this.lastY = event.clientY;
        this.element.style.cursor = 'n-resize';
        document.body.style.userSelect = 'none';
    }

    handleRowResizeEnd() {

        this.activeRowElement = null;
        this.element.style.cursor = 'auto';
        document.body.style.userSelect = 'auto';
    }

    handleRowResize( event ) {

        const minHeight = 50;
        const distY = event.clientY - this.lastY;
        const height = parseFloat( window.getComputedStyle( this.activeRowElement ).height );
        const newHeight = height + distY;

        if ( newHeight >= minHeight ) {

            this.activeRowElement.style.height = height + distY + 'px';
            this.lastY = event.clientY;
        }
    }

    addRow() {

        const row = new DesignRow();
        row.addPlaceholder();
        this.rows.push( row );
        $a( this.element, row.dom() );
    }

    dom() {

        return this.element;
    }
}

export { Design };