import { Line } from './line';
import { Circle } from './circle';

/**
 * @returns {object} Point of intersection, otherwise null
 */ 
function collideLineLine( line1, line2 ) {

    return Line.getI( line1, line2 );
}

/**
 * @returns {bool} true if collides, otherwise false
 */
function collideCircleLine( circle, line ) {

    // Vertical distance from center of cirle to line
    const vd = line.calcDistFromPoint( circle.x, circle.y );
    return vd < circle.r;
}

export {

    collideLineLine,
    collideCircleLine
}