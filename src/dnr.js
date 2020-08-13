import { $c, genRandomString } from './utils';

/**
 * Draggable and Resizable
 */
class Dnr {

    id;
    element;
    state = 'static';
    // topBorderRect;
    // rightBorderRect;
    // rectOfBottomBorder;
    // rectOfLeftBorder;

    constructor( args={} ) {

        const {

            id = genRandomString(),
            x = 0,
            y = 0,
            width = 100,
            height = 100,
            backgroundColor = '#00000030',
            text = '',
            
        } = args;

        this.id = id;
        // console.log( '@@ container', this.container )

        this.element = $c(`
            <div class="dnr">
                <button class="dnr__close">x</button>
                <div class="dnr__content">${text}</div>
            </div>
        `);

        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
        this.element.style.backgroundColor = backgroundColor;
        this.element.setAttribute( 'dnr-state', 'static' );
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
        const tw = parseFloat( style.borderTopWidth );
        const rw = parseFloat( style.borderRightWidth );
        const bw = parseFloat( style.borderBottomWidth );
        const lw = parseFloat( style.borderLeftWidth );

        // IMPORTANT: Those rects do not include corners
        const topRect = {
            x: dr.x + lw, 
            y: dr.y, 
            width: dr.width - lw - rw,
            height: tw
        };

        const rightRect = {
            x: dr.x + dr.width - rw,
            y: dr.y + tw,
            width: rw,
            height: dr.height - tw - bw
        };

        const bottomRect = {
            x: dr.x + lw,
            y: dr.y + dr.height - bw,
            width: dr.width - lw - rw,
            height: bw
        };

        const leftRect = {
            x: dr.x,
            y: dr.y + tw,
            width: lw,
            height: dr.height - tw - bw
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