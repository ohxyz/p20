import { $c, $q } from '../utils';

class SizeCanvasTool {

    constructor( { mainPanel } ) {

        this.element = $c(`
            <div id="size-canvas-tool">
                <form id="size-canvas-tool__form">
                    <input id="size-canvas-tool__width" type="text" placeholder="width" />
                    <input id="size-canvas-tool__height" type="text" placeholder="height" />
                    <button type="submit" id="size-canvas-tool__button">Update Canvas</button>
                </form>
            </div>
        `);

        this.mainPanel = mainPanel;
        this.init();
    }

    init() {

        $q( '#size-canvas-tool__form', this.element ).addEventListener( 'submit', event => {

            event.preventDefault();
            const w = parseFloat( $q( '#size-canvas-tool__width', this.element ).value );
            const h = parseFloat( $q( '#size-canvas-tool__height', this.element ).value );

            this.mainPanel.canvas.update( { width: w, height: h } );
            this.mainPanel.canvas.draw();

            const minTop = 100;
            const minBottom = 100;
            const minLeft = 100;
            const minRight = 100;

            const mainPanelStyle = this.mainPanel.style();
            const mainPanelWidth = parseFloat( mainPanelStyle.width );
            const mainPanelHeight = parseFloat( mainPanelStyle.height );

            const newWidth = minLeft + w + minRight;
            const newHeight = minTop + h + minBottom;

            this.mainPanel.update( { width: newWidth, height: newHeight } );
            this.mainPanel.reposition();
        } );
    }

    dom() {

        return this.element;
    }
}

export { SizeCanvasTool }