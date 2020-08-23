/**
 * An interface that provides utility functions
 */
class Box {

    #element;

    constructor( domElement ) {

        this.#element = domElement;
    }

    style() {

        return window.getComputedStyle( this.#element );
    }

    /**
     * Exclude borders
     */
    innerRect() {
        
        const { x, y, width, height, right, bottom } = this.#element.getBoundingClientRect();

        const borders = this.borders();
        const left = x + borders.left;
        const top = y + borders.top;

        return {

            x: left,
            y: top,
            width: width - borders.left - borders.right,
            height: height - borders.top - borders.bottom,
            left,
            top,
            right: right - borders.right,
            bottom: bottom - borders.bottom
        };
    }

    outerRect() {

        return this.#element.getBoundingClientRect();
    }

    borders() {

        return Box.getBorders( this.#element );
    }

    /**
     * Position the box relative to it's container
     * Note: container's position must not be `static`
     */
    position( x, y, excludeBorders=true ) {

        this.#element.style.position = 'absolute';

        if ( excludeBorders === false ) {

            this.#element.style.left = x + 'px';
            this.#element.style.top = y + 'px';
            return;
        }

        const style = window.getComputedStyle( this.#element );
        const leftBorder = parseFloat( style.borderLeftWidth );
        const topBorder = parseFloat( style.borderTopWidth );

        this.#element.style.left = x - leftBorder + 'px';
        this.#element.style.top = y - topBorder + 'px';
    }

    center() {

        const parent = this.#element.parentElement;

        if ( !parent ) {
            throw new Error( "Parent element not found!" );
        }

        const pRect = parent.getBoundingClientRect();
        const pStyle = window.getComputedStyle( parent );
        const pBorders = Box.getBorders( parent );

        const pWidth = pRect.width - pBorders.left - pBorders.right;
        const pHeight = pRect.height - pBorders.top - pBorders.bottom;

        const myRect = this.innerRect();
        const myWidth = myRect.width;
        const myHeight = myRect.height;

        console.log( myWidth )

        this.position( (pWidth - myWidth)/2, (pHeight - myHeight)/2 );
    }

    dom() {

        return this.#element;
    }

    static getBorders( element ) {

        const style = window.getComputedStyle( element );
        const left = parseFloat( style.borderLeftWidth );
        const right = parseFloat( style.borderRightWidth );
        const top = parseFloat( style.borderTopWidth );
        const bottom = parseFloat( style.borderBottomWidth );

        return { left, right, top, bottom };
    }

    /**
     * Calculate x and y relative to another element, after taking off border width
     * 
     * @returns {object} - left, top relative to another element
     */
    static calcRelPos( elem, relElem ) {

        const rect = elem.getBoundingClientRect();
        const relRect = relElem.getBoundingClientRect();

        const elemStyle = window.getComputedStyle( elem );
        const relElemStyle = window.getComputedStyle( relElem );
        // Left border width of element
        const leftBorderOfElem = parseFloat( elemStyle.borderLeftWidth );
        const topBorderOfElem = parseFloat( elemStyle.borderTopWidth );
        const leftBorderOfRel = parseFloat( relElemStyle.borderLeftWidth );
        const topBorderOfRel = parseFloat( relElemStyle.borderLeftWidth );

        const left = rect.left + leftBorderOfElem - relRect.left - leftBorderOfRel;
        const top = rect.top + topBorderOfElem - relRect.top - topBorderOfRel;

        return { left, top };
    }

    /**
     * Set an element's position relative to another element
     * Assume they are in the same container. Both are position:absolute
     */
    static setRelPos( elem, relElem, { left, top } ) {

        const elemStyle = window.getComputedStyle( elem );
        const relElemStyle = window.getComputedStyle( relElem );

        const leftBorderOfElem = parseFloat( elemStyle.borderLeftWidth );
        const topBorderOfElem = parseFloat( elemStyle.borderTopWidth );
        const leftBorderOfRel = parseFloat( relElemStyle.borderLeftWidth );
        const topBorderOfRel = parseFloat( relElemStyle.borderLeftWidth );

        const leftOfRel = parseFloat( relElemStyle.left );
        const topOfRel = parseFloat( relElemStyle.top );

        elem.style.left = leftOfRel + leftBorderOfRel - leftBorderOfElem  + left + 'px';
        elem.style.top = topOfRel + topBorderOfRel - topBorderOfElem + top + 'px'; 
    }
}

export { Box }