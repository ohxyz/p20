import { $ce, rgba } from './utils';

class Canvas {

    width;
    height;
    element;
    context;

    shouldShowHStripes = false;
    shouldShowVStripes = false;
    shouldShowGrid = false;

    numOfVStripes = 10;
    numOfHStripes = 10;
    stripeColor = '#ff000020';

    gridCellSize = 30;
    gridLineColor = '#000000';

    constructor( { width, height } ) {

        this.width = width;
        this.height = height;
        this.element = $ce( 'canvas' );
        this.context = this.element.getContext( '2d' );

        this.element.width = width;
        this.element.height = height;
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.border = "10px solid #0000ff50";
        this.element.style.zIndex = 1;
    }

    /**
     * Draw a rectangle using ImageData, with minium anti-aliasing effect
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData
     */
    drawRectByImageData( x, y, width, height, alter=[1, 0], color="#000000" ) {

        const numOfSolidPoints = alter[0] < 1 ? 1 : alter[0];
        const numOfEmptyPoints = alter[1] < 0 ? 0 : alter[1];

        const [ r, g, b, a ] = rgba( color );
        const alpha = a * 255;

        const imageData = this.context.createImageData( width, height );

        let indexOfImageData = 0;
        let indexOfSolidPoints = 0;
        let indexOfEmptyPoints = 0;

        while ( indexOfImageData < imageData.data.length ) {

            if ( indexOfSolidPoints < numOfSolidPoints ) {

                imageData.data[ indexOfImageData + 0 ] = r; // R value
                imageData.data[ indexOfImageData + 1 ] = g; // G value
                imageData.data[ indexOfImageData + 2 ] = b; // B value
                imageData.data[ indexOfImageData + 3 ] = alpha; // A value

                indexOfSolidPoints ++;
            }
            else if ( indexOfEmptyPoints < numOfEmptyPoints ) {

                indexOfEmptyPoints ++;
            }

            if ( indexOfSolidPoints === numOfSolidPoints && indexOfEmptyPoints === numOfEmptyPoints ) {

                indexOfSolidPoints = 0;
                indexOfEmptyPoints = 0;
            }

            indexOfImageData += 4;
        }

        // Draw image data to the canvas
        this.context.putImageData( imageData, x, y );
    }

    update( args = {} ) {

        let { width, height } = args;

        width = width ? width : parseFloat( this.element.style.width );
        height = height ? height : parseFloat( this.element.style.width );

        this.width = width;
        this.height = height;
        this.element.setAttribute( 'width', width );
        this.element.setAttribute( 'height', height );
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    /**
     * Draw a vertical line with minium anti-aliasing effect by ImageData
     */
    drawVLine( x, y, length, dash, color ) {

        this.drawRectByImageData( x, y, 1, length, dash, color );
    }

    drawHLine( x, y, length, dash, color ) {

        this.drawRectByImageData( x, y, length, 1, dash, color );
    }

    drawGridLines( cellSize=20, color='#000000' ) {

        let x = cellSize;

        while ( x < this.width ) {

            this.drawVLine( x, 0, this.height, [2, 2], color );
            x += cellSize;
        }

        let y = cellSize;

        while ( y < this.height ) {

            this.drawHLine( 0, y, this.width, [2, 2], color )
            y += cellSize;
        }
    }

    drawGridStripes( args ) {

        const { cols=1, rows=1, color='#ff000020' } = args;

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

    drawColStripes( aNumOfStripes=10, aAlterColor='#ff000020' ) {

        const eachWidth = Math.round( this.width / aNumOfStripes );
        
        for ( let i = 0; i < aNumOfStripes; i ++ ) {

            const color = i % 2 === 0 ? '#ffffff' : aAlterColor;
            this.context.fillStyle = color;
            
            const xOfRect = i * eachWidth;
            this.context.fillRect( xOfRect, 0, eachWidth, this.height );
        }
    }

    drawRowStripes( aNumOfStripes=10, aAlterColor='#ff000020') {

        const eachHeight = Math.round( this.width / aNumOfStripes );
        
        for ( let i = 0; i < aNumOfStripes; i ++ ) {

            const color = i % 2 === 0 ? '#ffffff' : aAlterColor;
            this.context.fillStyle = color;
            
            const yOfRect = i * eachHeight;
            this.context.fillRect( 0, yOfRect, this.width, eachHeight );
        }
    }

    /**
     * Note: Stripes should be drawn first, then grid;
     */
    draw() {

        this.clear();

        if ( this.shouldShowVStripes && this.shouldShowHStripes ) {

            this.drawGridStripes( { 
                col: this.numOfVStripes, 
                rows: this.numOfHStripes, 
                color: this.stripeColor 
            } );
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

    showGrid( flag ) {

        this.shouldShowGrid = flag;
        this.draw();
    }

    showVStripes( flag ) {

        this.shouldShowVStripes = flag;
        this.draw();
    }

    showHStripes( flag ) {

        this.shouldShowHStripes = flag;
        this.draw();
    }

    clear() {

        this.context.clearRect( 0, 0, this.width, this.height );
    }

    /**
     * @param {number} x - Position X relative to canvas
     * @param {number} y - Position Y relative to canvas
     * @return {object} index of col and index of row of the cell that contains x and y
     */
    getIndexOfCell( x, y ) {

        const colIndex = Math.floor( x / this.gridCellSize );
        const rowIndex = Math.floor( y / this.gridCellSize );

        return { col: colIndex, row: rowIndex };
    }

    dom() {

        return this.element;
    }
}

export { Canvas };