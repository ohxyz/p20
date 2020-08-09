import { rgba } from '../utils';

class Point {

    x;
    y;

    constructor( x, y ) {

        this.x = x;
        this.y = y;
    }

    draw( context, color='#000000' ) {

        context.fillStyle = color;
        context.fillRect( this.x, this.y, 1, 1 );
    }

    static getDist( x1, y1, x2, y2 ) {

        return Math.round( Math.pow( Math.pow( (x1 - x2), 2 ) + Math.pow( (y1 - y2), 2 ), 0.5 ) );
    }

    /**
     * Draw a rectangle using ImageData, with minium anti-aliasing effect
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData
     */
    static drawRect( context, x, y, width, height, alter=[1, 0], color="#000000" ) {

        const numOfSolidPoints = alter[0] < 1 ? 1 : alter[0];
        const numOfEmptyPoints = alter[1] < 0 ? 0 : alter[1];

        const [ r, g, b, a ] = rgba( color );
        const alpha = a * 255;

        const imageData = context.createImageData( width, height );

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
        context.putImageData( imageData, x, y );
    }

}

export { Point };