import { $c, $q } from '../utils';

class DrawCanvasTool {

    constructor( { mainPanel, stripes, grid } ) {

        this.mainPanel = mainPanel;
        this.shouldShowStripes = stripes || false;
        this.shouldShowGrid = grid || false;

        this.element = $c(`
            <div id="draw-canvas-tool">
                <input 
                    type="checkbox" 
                    id="draw-canvas-tool__draw-stripes"
                    ${ this.shouldShowStripes ? 'checked' : '' }
                />
                <label for="draw-canvas-tool__draw-stripes">Show stripes</label>
                <input 
                    type="checkbox" 
                    id="draw-canvas-tool__draw-grid"
                    ${ this.shouldShowGrid ? 'checked' : '' }
                />
                <label for="draw-canvas-tool__draw-grid">Show grid</label>
            </div>  
        `);

        this.init();
    }

    init() {

        this.mainPanel.canvas.showVStripes( this.shouldShowStripes );
        this.mainPanel.canvas.showGrid( this.shouldShowGrid );

        const drawStipesCheckbox = $q( '#draw-canvas-tool__draw-stripes', this.element );

        drawStipesCheckbox.addEventListener( 'change', event => {

            this.mainPanel.canvas.showVStripes( event.currentTarget.checked )
        } );

        const drawGridCheckbox = $q( '#draw-canvas-tool__draw-grid', this.element );

        drawGridCheckbox.addEventListener( 'change', () => {

            this.mainPanel.canvas.showGrid( event.currentTarget.checked )
        } )
    }

    dom() {

        return this.element;
    }
}

export { DrawCanvasTool };