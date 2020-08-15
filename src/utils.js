function $q( selectors, container ) {

    if ( container ) {
        return container.querySelector( selectors );
    }

    return document.querySelector( selectors );
}

function $qa( selectors, container ) {

    if ( container ) {
        return container.querySelectorAll( selectors );
    }

    return document.querySelectorAll( selectors );
}

function $c( tagString ) {

    return document.createRange().createContextualFragment( tagString.trim() ).firstChild;
}

function $ce( tagName, options ) {
    
    return document.createElement( tagName, options );
}

function genRandomString() {
    
    return Math.random().toString( 36 ).slice( 2 );
}

function isInRect( x, y, rect ) {

    return ( x >= rect.x && x <= rect.x + rect.width ) && ( y >= rect.y && y <= rect.y + rect.height );
}

/**
 * Calculate x and y relative to another element, after taking off width
 * 
 * @returns {object} - x, y relative to another element
 */
function calcRelPos( elem, relElem ) {

    const rect = elem.getBoundingClientRect();
    const relRect = relElem.getBoundingClientRect();

    const elemStyle = window.getComputedStyle( elem );
    const relElemStyle = window.getComputedStyle( relElem );
    // Left border width of element
    const lbwOfElem = parseFloat( elemStyle.borderLeftWidth );
    const tbwOfElem = parseFloat( elemStyle.borderTopWidth );
    const lbwOfRelElem = parseFloat( relElemStyle.borderLeftWidth );
    const tbwOfRelElem = parseFloat( relElemStyle.borderLeftWidth );

    const x = rect.left + lbwOfElem - relRect.left - lbwOfRelElem;
    const y = rect.top + tbwOfElem - relRect.top - tbwOfRelElem;

    return { x, y };
}

/**
 * Convert any color string to array of RGBA values
 * https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
 */
function rgba( color ) {

    if (!color)
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}

const $u = {

    $q,
    $qa,
    $ce,
    $c,
    rgba,
    genRandomString,
    isInRect,
    calcRelPos,
};

window.$u = $u;

export { 
    
    $u as default,
    $q,
    $qa,
    $ce,
    $c,
    rgba,
    genRandomString,
    isInRect,
    calcRelPos
};
