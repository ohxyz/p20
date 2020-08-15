import { $c, $q } from '../utils';

class DrawCanvasTool {

    constructor( { mainPanel } ) {

        this.mainPanel = mainPanel;
        this.element = $c(`
            <div id="draw-canvas-tool">
                <input type="checkbox" id="draw-canvas-tool__draw-stripes" />
                <label for="draw-canvas-tool__draw-stripes">Show stripes</label>
                <input type="checkbox" id="draw-canvas-tool__draw-grid" />
                <label for="draw-canvas-tool__draw-grid">Show grid</label>
            </div>  
        `);

        this.init();
    }

    init() {

        const drawStipesCheckbox = $q( '#draw-canvas-tool__draw-stripes', this.element );

        drawStipesCheckbox.addEventListener( 'change', event => {

            this.mainPanel.canvas.showVStripes( event.currentTarget.checked, 10, '#ff000030' )
        } );

        const drawGridCheckbox = $q( '#draw-canvas-tool__draw-grid', this.element );

        drawGridCheckbox.addEventListener( 'change', () => {

            this.mainPanel.canvas.showGrid( event.currentTarget.checked, 100 )
        } )
    }

    dom() {

        return this.element;
    }
}

export { DrawCanvasTool };