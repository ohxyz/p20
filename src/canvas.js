import { Line } from './shapes/line';
import { $ce } from './utils';

class Canvas {

    width;
    height;
    elementId;
    element;
    context;

    shouldShowHStripes = false;
    shouldShowVStripes = false;
    shouldShowGrid = false;

    numOfVStripes = 10;
    numOfHStripes = 10;
    stripeColor = '#f5f5f5';

    gridCellSize = 20;
    gridLineColor = '#000000';

    constructor( { id, width, height } ) {

        if ( id === undefined ) {
            throw new Error( 'DOM element ID not found!' );
        }

        this.width = width;
        this.height = height;
        this.elementId = id;
        this.element = $ce( 'canvas' );
        this.context = this.element.getContext( '2d' );

        this.element.width = width;
        this.element.height = height;
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.border = "5px solid #0000ff50";
        this.element.style.zIndex = 1;
    }

    drawGridLines( cellSize=20, color='#000000' ) {

        let x = cellSize;

        while ( x < this.width ) {

            Line.drawVLine( this.context, x, 0, this.height, [2, 2], color );
            x += cellSize;
        }

        let y = cellSize;

        while ( y < this.height ) {

            Line.drawHLine( this.context, 0, y, this.width, [2, 2], color );
            y += cellSize;
        }
    }

    drawGridStripes( args ) {

        const { cols=1, rows=1, color='#f5f5f5' } = args;

        const eachWidth = Math.round( this.width / cols );
        const eachHeight = Math.round( this.height / rows );

        for ( let i = 0; i < rows; i++ ) {

            for ( let j = 0; j < cols; j++ ) {

                const fillColor = ( i + j ) % 2 === 0 ? '#ffffff' : color;
                const xOfRect = j * eachWidth;
                const yOfRect = i * eachHeight;
                this.context.fillStyle = fillColor;
                this.context.fillRect( xOfRect, yOfRect, eachWidth, eachHeight );
            }
        }
    }

    drawColStripes( aNumOfStripes=1, aAlterColor='#f5f5f5' ) {

        const eachWidth = Math.round( this.width / aNumOfStripes );
        
        for ( let i = 0; i < aNumOfStripes; i ++ ) {

            const color = i % 2 === 0 ? '#ffffff' : aAlterColor;
            this.context.fillStyle = color;
            
            const xOfRect = i * eachWidth;
            this.context.fillRect( xOfRect, 0, eachWidth, this.height );
        }
    }

    drawRowStripes( aNumOfStripes=1, aAlterColor='#f5f5f5') {

        const eachHeight = Math.round( this.width / aNumOfStripes );
        
        for ( let i = 0; i < aNumOfStripes; i ++ ) {

            const color = i % 2 === 0 ? '#ffffff' : aAlterColor;
            this.context.fillStyle = color;
            
            const yOfRect = i * eachHeight;
            this.context.fillRect( 0, yOfRect, this.width, eachHeight );
        }
    }

    /**
     * Note: Stripes should be drawn first, then grids;
     */
    draw() {

        this.clear();

        if ( this.shouldShowVStripes && this.shouldShowHStripes ) {

            this.drawGridStripes( { col: this.numOfVStripes, rows: this.numOfHStripes, color: this.stripeColor } );
        }
        else if ( this.shouldShowVStripes && !this.shouldShowHStripes ) {

            this.drawColStripes( this.numOfVStripes, this.stripeColor );
        }
        else if ( !this.shouldShowVStripes && this.shouldShowHStripes ) {

            this.drawRowStripes( this.numOfHStripes, this.stripeColor );
        }

        if ( this.shouldShowGrid ) {

            this.drawGridLines( this.gridCellSize, this.gridLineColor );
        }
    }

    showGrid( flag, cellSize, lineColor ) {

        this.shouldShowGrid = flag;
        this.gridCellSize = cellSize;
        this.gridLineColor = lineColor;
        this.draw();
    }

    showVStripes( flag, num, color ) {

        this.shouldShowVStripes = flag;
        this.stripeColor = color;
        this.numOfVStripes = num;
        this.draw();
    }

    showHStripes( flag, num, color ) {

        this.shouldShowHStripes = flag;
        this.stripeColor = color;
        this.numOfHStripes = num;
        this.draw();
    }

    clear() {

        this.context.clearRect( 0, 0, this.width, this.height );
    }

    dom() {

        return this.element;
    }
}

export { Canvas };