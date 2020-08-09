import { Point } from './point';

class Line {

    x1;
    y1;
    x2;
    y2;
    k;
    color = "#000000";
    lineWidth = 1.0;

    constructor() {

        if ( arguments.length === 1 ) {

            this.construct( arguments[0] );
        }
        else if ( arguments.length === 3 ) {

            this.construct( {
                x1: arguments[0], 
                y1: arguments[1], 
                k: arguments[2]
            } );
        }
        else if ( arguments.length === 4 ) {

            this.construct( { 
                x1: arguments[0], 
                y1: arguments[1], 
                x2: arguments[2],
                y2: arguments[3],
            } );

            this.k = this.calcK();
        }
        else {

            throw "Error: Line arguments error!";
        }
    }

    construct( { x1, y1, x2, y2, k } ) {

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.k = k;
    }

    // formula: y - y1 = k * ( x - x1 )
    calcK() {

        return ( this.y2 - this.y1 ) / ( this.x2 - this.x1 );
    }

    /**
     * Caculate the point of intersection from a point on its P line
     */ 
    calcIFromPoint( aX, aY ) {

        const kp = -1 / this.k;
        // x of point of intersction
        const xi = ( kp * aX - this.k * this.x1 + this.y1 - aY ) / ( kp - this.k );
        const yi = this.k * ( xi - this.x1 ) + this.y1;
        // round xi and yi
        const rxi = Math.round( xi );
        const ryi = Math.round( yi );

        return new Point( rxi, ryi );
    }

    /**
     * Caculate the distance between a point on its P line and the point of intersection
     */ 
    calcDistFromPoint( aX, aY ) {

        const pi = this.calcIFromPoint( aX, aY );
        return Point.getDist( aX, aY, pi.x, pi.y );
    }

    getDist() {

        return Point.getDist( { x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 } );
    }

    draw( context, color, width ) {

        Line.drawLine( context, this.x1, this.y1, this.x2, this.y2, color, width );
    }

    drawByK( context, color, width ) {

        Line.drawLineByK( context, this.x1, this.y1, this.k, color, width );
    }

    drawPLine( context, color, width ) {

        // k of perpendicular line
        const kp = -1 / this.k;
        Line.drawLineByK( context, this.x1, this.y1, kp, color, width );
    }

    drawPLineByPoint( aContext, aX, aY, aColor, aWidth ) {

        const point = this.calcIFromPoint( aX, aY );

        Line.drawLine( aContext, point.x, point.y, aX, aY, aColor, aWidth );
    }

    /**
     * Draw a vertical line with minium anti-aliasing effect by ImageData
     */
    static drawVLine( context, x, y, length, dash, color ) {

        Point.drawRect( context, x, y, 1, length, dash, color );
    }

    static drawHLine( context, x, y, length, dash, color ) {

        Point.drawRect( context, x, y, length, 1, dash, color );
    }

    static drawLineByK( context, x1, y1, k, color, width ) {

        if ( x1 === undefined || y1 === undefined || k === undefined ) {

            throw "Error: At least one of x1, y1, k not defined!";
        }

        const x2 = ( k * x1 - y1 ) / k;
        const y2 = 0;

        Line.drawLine( context, x1, y1, x2, y2, color, width );
    }

    static drawLine( context, x1, y1, x2, y2, color, width ) {

        if ( x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined ) {
            throw "Error: At least one of x1, y1, x2, y2 not defined!";
        }

        width = typeof width === 'undefined' ? 1.0 : width;
        color = typeof color === 'undefined' ? '#000000' : color;

        context.lineWidth = width;
        context.beginPath();
        context.moveTo( x1, y1 );
        context.lineTo( x2, y2 );
        context.strokeStyle = color;
        context.stroke();
    } 

    // Get point of intersection. e.g. { x: 10, y: 20 }
    static calcI( line1, line2 ) {
        // x1, y1 of line1
        const x1 = line1.x1;
        const y1 = line1.y1;
        const k1 = line1.k;
        // x1, y1 of line2
        const x1a = line2.x1;
        const y1a = line2.y1;
        const k2 = line2.k;
        
        // result
        const x = Math.round( ( k1 * x1 - k2 * x1a + y1a - y1 ) / ( k1 - k2 ) );
        const y = Math.round( k1 * ( x - x1 ) + y1 );

        return { x, y };
    }

    /**
     * @returns {object} Pointer of intersection, otherwise null
     */
    static getI( line1, line2 ) {

        // point of itersection
        const i = Line.calcI( line1, line2 );

        for ( let line of [ line1, line2 ] ) {

            const dist = line.getDist();

            const distOfIToX1Y1 = Point.getDist( i.x, i.y, line.x1, line.y1 );
            const distOfIToX2Y2 = Point.getDist( i.x, i.y, line.x2, line.y2 );

            // console.log( dist, distOfIToX1Y1, distOfIToX2Y2 )

            if ( distOfIToX1Y1 > dist || distOfIToX2Y2 > dist ) {

                return null;
            }
        }

        return i;
    }
}

export {

    Line
};