class Circle {

    x;
    y;
    r;
    color = '#000000';

    constructor( x, y, r ) {

        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw( context ) {

        context.beginPath();
        context.arc( this.x, this.y, this.r, 0, 2 * Math.PI );
        context.strokeStyle = this.color;
        context.stroke();
    }
}

export { Circle };