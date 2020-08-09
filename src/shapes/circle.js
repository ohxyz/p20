class Circle {

    x;
    y;
    r;

    constructor( x, y, r ) {

        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw( aContext, aColor, aLineWidth ) {

        const lineWidth = typeof aLineWidth === 'undefined' ? 1.0 : aLineWidth;
        const color = typeof aColor === 'undefined' ? '#000000' : aColor;

        aContext.lineWidth = lineWidth;
        aContext.beginPath();
        aContext.arc( this.x, this.y, this.r, 0, 2 * Math.PI );
        aContext.strokeStyle = color;
        aContext.stroke();
    }
}

export { Circle };