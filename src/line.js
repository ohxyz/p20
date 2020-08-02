import { Point } from './point';

class Line {

    x1;
    y1;
    x2;
    y2;
    color = "#000000";

    constructor( x1, y1, x2, y2 ) {

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    // formula: y - y1 = k * ( x - x1 )
    getK() {

        return ( this.y2 - this.y1 ) / ( this.x2 - this.x1 );
    }

    getDist() {

        return Point.getDist( { x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 } );
    }

    draw( context ) {

        context.beginPath();
        context.moveTo( this.x1, this.y1 );
        context.lineTo( this.x2, this.y2 );
        context.strokeStyle = this.color;
        context.stroke();
    }

    // Get point of intersection. e.g. { x: 10, y: 20 }
    static getI( line1, line2 ) {

        const k1 = line1.getK();
        const k2 = line2.getK();
        // x1, y1 of line1
        const x1 = line1.x1;
        const y1 = line1.y1;
        // x1, y1 of line2
        const x1a = line2.x1;
        const y1a = line2.y1;
        // result
        const x = Math.round( ( k1 * x1 - k2 * x1a + y1a - y1 ) / ( k1 - k2 ) );
        const y = Math.round( k1 * ( x - x1 ) + y1 );

        return { x, y };
    }

    static doesCross( line1, line2 ) {

        // point of itersection
        const i = Line.getI( line1, line2 );

        for ( let line of [ line1, line2 ] ) {

            const dist = line.getDist();

            const distOfIToX1Y1 = Point.getDist( i, { x: line.x1, y: line.y1 } );
            const distOfIToX2Y2 = Point.getDist( i, { x: line.x2, y: line.y2 } );

            console.log( dist, distOfIToX1Y1, distOfIToX2Y2 )

            if ( distOfIToX1Y1 > dist || distOfIToX2Y2 > dist ) {

                return false;
            }
        }

        return true;
    }
}

export {

    Line
};