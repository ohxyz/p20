import { Line } from './shapes/line';

class Canvas {

    width;
    height;
    elementId;
    element;
    context;

    constructor( { id, width, height } ) {

        if ( id === undefined ) {
            throw new Error( 'DOM element ID not found!' );
        }

        this.width = width;
        this.height = height;
        this.elementId = id;
        this.element = document.getElementById( this.elementId );
        this.context = this.element.getContext( '2d' );

        this.element.width = width;
        this.element.height = height;
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
    }

    drawGridLines( aSpacing=20, color='#000000' ) {

        let x = aSpacing;

        while ( x < this.width ) {

            Line.drawVLine( this.context, x, 0, this.height, [2, 2], color );
            x += aSpacing;
        }

        let y = aSpacing;

        while ( y < this.height ) {

            Line.drawHLine( this.context, 0, y, this.width, [2, 2], color );
            y += aSpacing;
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

    clear() {

        this.context.clearRect( 0, 0, this.width, this.height );
    }

    dom() {

        return this.element;
    }
}

export { Canvas };