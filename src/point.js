class Point {

    x;
    y;
    color = '#000000';

    constructor( x, y ) {

        this.x = x;
        this.y = y;
    }

    draw( context ) {

        context.fillRect( this.x, this.y, 1, 1 );
    }

    static getDist( x1, y1, x2, y2 ) {

        return Math.round( Math.pow( Math.pow( (x1 - x2), 2 ) + Math.pow( (y1 - y2), 2 ), 0.5 ) );
    }
}

export { Point };