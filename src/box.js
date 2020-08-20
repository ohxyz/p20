class Box {

    constructor( domElement ) {

        this.element = domElement;
    }

    style() {

        return window.getComputedStyle( this.element );
    }

    rect() {

        return this.element.getBoundingClientRect();
    }

    inner() {

    }

    outer() {

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