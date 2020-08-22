import { $c, $q, genRandomString } from './utils';

/**
 * Draggable and Resizable
 */
class Dnr {

    id;
    element;
    state = 'static';

    constructor( args={} ) {

        const {

            id = genRandomString(),
            x = 0,
            y = 0,
            width = 100,
            height = 100,
            backgroundColor = '#00000030',
            borderColor = '#00000020',
            borderStyle = 'solid',
            borderWidth = 5,
            name = '',
            content = ''
            
        } = args;

        this.id = id;
        this.name = name;
        this.element = $c(`
            <div class="dnr">
                <button class="dnr__close">x</button>
                <div class="dnr__content"></div>
            </div>
        `);

        if ( typeof content === 'string' ) {
            $q( '.dnr__content', this.element ).appendChild( $c( content ) );
        }
        else if ( content instanceof Node ) {
            $q( '.dnr__content', this.element ).appendChild( content );
        }
        else {
            throw new Error( 'Invalid content' );
        }

        this.element.style.position = 'absolute';
        this.element.style.top = y - borderWidth + 'px';
        this.element.style.left = x - borderWidth + 'px';
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.borderTop = `${borderWidth}px ${borderStyle} ${borderColor}`;
        this.element.style.borderRight = `${borderWidth}px ${borderStyle} ${borderColor}`;
        this.element.style.borderBottom = `${borderWidth}px ${borderStyle} ${borderColor}`;
        this.element.style.borderLeft = `${borderWidth}px ${borderStyle} ${borderColor}`;
        this.element.style.backgroundColor = backgroundColor;
        this.element.setAttribute( 'dnr-state', 'static' );
    }

    /**
     * @returns {number} - Inner box's x relative to it's container
     */
    get offsetX() {

        const style = window.getComputedStyle( this.element );
        const left = parseFloat( style.left );
        const borderLeft = parseFloat( style.borderLeftWidth );

        return left + borderLeft;
    }

    set offsetX( value ) {
        
        const borderLeft = parseFloat( window.getComputedStyle(this.element).borderLeftWidth );
        this.element.style.left = value - borderLeft + 'px';
    }

    /**
     * @returns {number} - Inner box's y relative to it's container
     */
    get offsetY() {
        
        const style = window.getComputedStyle( this.element );
        const top = parseFloat( style.top )
        const borderTop = parseFloat( style.borderTopWidth );

        return top + borderTop;
    }

    set offsetY( value ) {
        
        const borderTop = parseFloat( window.getComputedStyle(this.element).borderTopWidth );
        this.element.style.top = value - borderTop + 'px';
    }

    rect() {

        return this.element.getBoundingClientRect();
    }

    style() {

        return window.getComputedStyle( this.element );
    }

    innerRect() {

        const rect = this.element.getBoundingClientRect();

        const { x, y, width, height, right, bottom } = rect;
        const style = window.getComputedStyle( this.element );

        const left = x + parseFloat( style.borderLeftWidth );
        const top = y + parseFloat( style.borderTopWidth );

        return {

            x: left,
            y: top,
            width: parseFloat( style.width ),
            height: parseFloat( style.height ),
            left,
            top,
            right: right - parseFloat( style.borderRightWidth ),
            bottom: bottom - parseFloat( style.borderBottomWidth )
        };
    }

    getState() {

        return this.element.getAttribute( 'dnr-state' );
    }

    setState( state ) {

        this.element.setAttribute( 'dnr-state', state );
    }

    // Todo: add a self rect 
    getBorderRects() {

        // dnr rect
        const dr = this.element.getBoundingClientRect();
        const style = window.getComputedStyle( this.element );

        // Top border Width, etc
        const tbw = parseFloat( style.borderTopWidth );
        const rbw = parseFloat( style.borderRightWidth );
        const bbw = parseFloat( style.borderBottomWidth );
        const lbw = parseFloat( style.borderLeftWidth );

        // IMPORTANT: Those rects do not include corners
        const topRect = {
            x: dr.x + lbw, 
            y: dr.y, 
            width: dr.width - lbw - rbw,
            height: tbw
        };

        const rightRect = {
            x: dr.x + dr.width - rbw,
            y: dr.y + tbw,
            width: rbw,
            height: dr.height - tbw - bbw
        };

        const bottomRect = {
            x: dr.x + lbw,
            y: dr.y + dr.height - bbw,
            width: dr.width - lbw - rbw,
            height: bbw
        };

        const leftRect = {
            x: dr.x,
            y: dr.y + tbw,
            width: lbw,
            height: dr.height - tbw - bbw
        };

        return {

            top: topRect, 
            right: rightRect,
            bottom: bottomRect,
            left: leftRect
        };
    }


    remove() {

        this.element.remove();
    }

    handleClick() {

        console.log( '@@ click', this.id );
    }

    dom() {

        return this.element;
    }

    static isCloseButton( element ) {

        return element.className.includes( 'dnr__close' );
    }
}

export {

    Dnr
};