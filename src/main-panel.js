import { $q, $c, isInRect } from './utils';
import { DnrManager } from './dnr-manager';
import { Dnr } from './dnr';
import { Canvas } from './canvas';
import { Box } from './box';
import { TextField } from 'p20c';

class MainPanel {

    canvas;
    element;
    chm;
    prevCanvasRect = null;
    currCanvasRect = null;

    constructor( args={} ) {

        const {

            width = 800,
            height = 800,
            canvasWidth = 500,
            canvasHeight = 500,

        } = args;

        this.element = $c( '<div id="main-panel" class="main-panel">' );
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'relative';
        this.element.style.zIndex = 10;
        this.element.style.backgroundColor = '#ff000010';
        this.element.style.margin = '0 auto';

        this.canvas = new Canvas( { id: 'canvas', width: canvasWidth, height: canvasHeight } )
        this.element.appendChild( this.canvas.dom() );

        // component holder manager;
        this.chm = new DnrManager( { container: this.element } );

        this.element.addEventListener( 'dragenter', this.handleDragEnter.bind(this) );
        this.element.addEventListener( 'dragover', this.handleDragOver.bind(this) );
        this.element.addEventListener( 'dragleave', this.handleDragLeave.bind(this) );
        this.element.addEventListener( 'drop', this.handleDrop.bind(this) );
        this.element.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );

    }

    update( args = {} ) {

        let { width, height } = args;

        width = width ? width : parseFloat( this.element.style.width );
        height = height ? height : parseFloat( this.element.style.width );

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    /**
     * @param { ...Dnr } - component holder
     */ 
    addCompHolder() {

        for ( const ch of arguments ) {
            this.chm.add( ch );
        }
    }

    getRect() {

        return this.element.getBoundingClientRect();
    }

    /**
     * Position the canvas element in the center of main panel
     *
     * @todo Consider refactoring. Put this method into Canvas class
     */
    positionCanvas() {

        const selfRect = this.getRect();

        this.prevCanvasRect = this.canvas.dom().getBoundingClientRect();

        const canvasStyle = window.getComputedStyle( this.canvas.dom() );

        const widthOfCanvas = parseFloat( canvasStyle.width );
        const heightOfCanvas = parseFloat( canvasStyle.height );

        const leftBorderOfCanvas = parseFloat( canvasStyle.borderLeftWidth );
        const rightBorderOfCanvas = parseFloat( canvasStyle.borderRightWidth );
        const topBorderOfCanvas = parseFloat( canvasStyle.borderTopWidth );
        const bottomBorderOfCanvas = parseFloat( canvasStyle.borderBottomWidth );

        const leftOfCanvas = parseFloat( 
            ( selfRect.width - widthOfCanvas - leftBorderOfCanvas - rightBorderOfCanvas ) / 2 
        );
        const topOfCanvas = parseFloat( 
            ( selfRect.height - heightOfCanvas - topBorderOfCanvas - bottomBorderOfCanvas ) / 2 
        );

        this.canvas.dom().style.position = 'absolute';
        this.canvas.dom().style.left = leftOfCanvas + 'px';
        this.canvas.dom().style.top = topOfCanvas + 'px';

        this.currCanvasRect = this.canvas.dom().getBoundingClientRect();
    }

    /**
     * Position component holders against canvas
     */ 
    positionCompHolders() {

        for ( const ch of this.chm.getAll() ) {

            // remove 'px';
            const leftOfCh = parseFloat( ch.dom().style.left );
            const topOfCh = parseFloat( ch.dom().style.top );

            const distX = leftOfCh - this.prevCanvasRect.left;
            const distY = topOfCh - this.prevCanvasRect.top;

            const newLeftOfCh = parseFloat( distX + this.currCanvasRect.left );
            const newTopOfCh = parseFloat( distY + this.currCanvasRect.top );

            ch.dom().style.left = newLeftOfCh + 'px';
            ch.dom().style.top = newTopOfCh + 'px';
        }
    }

    reposition() {

        this.positionCanvas();
        this.positionCompHolders();
    }

    handleDragEnter( event ) {

        this.element.style.backgroundColor = '#ff000030';
    }

    handleDragOver( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    /**
     * The event fires when cursor moves into a child element
     * https://stackoverflow.com/questions/10867506
     */ 
    handleDragLeave( event ) {

        // Note: The color changes when cursor moves into canvas element
        this.element.style.backgroundColor = '#ff000010';
    }

    handleDrop( event ) {

        const dataString = event.dataTransfer.getData( 'text' );
        let data;

        try {
            
            data = JSON.parse( dataString );
        }
        catch ( error ) {

            // throw new Error( 'Not a valid customized dataTransfer object!' );
            return;
        }

        if ( data.type === 'comp-panel-item' ) {

            // Note: Don't use offsetX, offsetY 
            // Because curor can move on main panel's child element, e.g canvas
            // In this case, offsetX and offsetY are related to canvas, NOT main panel.
            const mainPanelRect = this.getRect();
            const x = event.clientX - mainPanelRect.x;
            const y = event.clientY - mainPanelRect.y;

            let content = null;

            if ( data.name === 'Textbox' ) {

                content = new TextField().dom();
            }
            else {

                content = data.name;
            }

            const ch = new Dnr( {
                x: x,
                y: y,
                content: content,
                name: data.name
            } );

            this.addCompHolder( ch );
            this.element.style.backgroundColor = '#ff000010';
        }
    }

    handleMouseUp( event ) {

        const ch = this.chm.activeDnr;

        if ( ch ) {

            this.handleCompHolderCanvasAlign( ch )
        }
    }

    handleCompHolderCanvasAlign( compHolder ) {

        const compHolderRect = compHolder.dom().getBoundingClientRect();
        const canvasRect = this.canvas.dom().getBoundingClientRect();

        if ( isInRect( compHolderRect.x, compHolderRect.y, canvasRect ) ) {

            const relPos = Box.calcRelPos( compHolder.dom(), this.canvas.dom() );
            const index = this.canvas.getIndexOfCell( relPos.left, relPos.top );

            const distX = index.col * this.canvas.gridCellSize;
            const distY = index.row * this.canvas.gridCellSize;

            Box.setRelPos( compHolder.dom(), this.canvas.dom(), { left: distX, top: distY } );
        }
    }

    dom() {

        return this.element;
    }
}

export {

    MainPanel
};