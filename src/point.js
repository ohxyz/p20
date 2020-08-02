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

    static getDist( p1, p2 ) {

        return Math.round( Math.pow( Math.pow( (p1.x - p2.x), 2 ) + Math.pow( (p1.y - p2.y), 2 ), 0.5 ) );
    }
}

export { Point };