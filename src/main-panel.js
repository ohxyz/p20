import { $q } from './utils';
import { DnrManager } from './dnr-manager';
import { Dnr } from './dnr';

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
            canvas = null

        } = args;

        this.element = $q( '#main-panel' );
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'relative';
        this.element.style.zIndex = 10;
        this.element.style.backgroundColor = '#ff000010';
        this.element.style.margin = '0 auto';

        this.canvas = canvas;
        this.element.appendChild( canvas.dom() );

        this.positionCanvas();

        // component holder manager;
        this.chm = new DnrManager( { container: this.element } );

        this.element.addEventListener( 'dragenter', this.handleDragEnter.bind(this) );
        this.element.addEventListener( 'dragover', this.handleDragOver.bind(this) );
        this.element.addEventListener( 'dragleave', this.handleDragLeave.bind(this) );
        this.element.addEventListener( 'drop', this.handleDrop.bind(this) );
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
    addComponentHolder() {

        for ( const ch of arguments ) {
            this.chm.add( ch );
        }
    }

    getSelfRect() {

        return this.element.getBoundingClientRect();
    }

    /**
     * Position the canvas element in the center of main panel
     */
    positionCanvas() {

        const canvasElem = this.canvas.dom();
        const selfRect = this.getSelfRect();

        this.prevCanvasRect = canvasElem.getBoundingClientRect();

        const widthOfCanvas = parseFloat( canvasElem.style.width );
        const heightOfCanvas = parseFloat( canvasElem.style.height );
        const topOfCanvas = parseFloat( ( selfRect.height - heightOfCanvas ) / 2 );
        const leftOfCanvas = parseFloat( ( selfRect.width - widthOfCanvas ) / 2 );

        this.canvas.dom().style.position = 'absolute';
        this.canvas.dom().style.left = leftOfCanvas + 'px';
        this.canvas.dom().style.top = topOfCanvas + 'px';

        this.currCanvasRect = canvasElem.getBoundingClientRect();
    }

    /**
     * Position component holders against canvas
     */ 
    positionComponentHolders() {

        // const canvasRect = this.canvas.dom().getBoundingClientRect();
        // console.log( '@@ prev in ', this.prevCanvasRect );

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

            // console.log( distX, distY, newLeftOfCh, newTopOfCh );
        }
    }

    reposition() {

        this.positionCanvas();
        this.positionComponentHolders();
    }

    handleDragEnter( event ) {

        this.element.style.backgroundColor = '#ff000030';
    }

    handleDragOver( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    handleDragLeave( event ) {

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
            const mainPanelRect = this.getSelfRect();
            const x = event.clientX - mainPanelRect.x;
            const y = event.clientY - mainPanelRect.y;

            const ch = new Dnr( {
                x: x,
                y: y,
                text: data.name
            } );

            this.addComponentHolder( ch );

            this.element.style.backgroundColor = '#ff000010';
        }
    }

    dom() {

        return this.element;
    }
}

export {

    MainPanel
};