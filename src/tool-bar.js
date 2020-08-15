import { $q } from './utils';
import { DrawCanvasTool } from './tools/draw-canvas';
import { SizeMainPanelTool } from './tools/size-main-panel';

class ToolBar {

    constructor( { mainPanel } ) {

        this.mainPanel = mainPanel;
        this.element = $q( '#tool-bar' );

        this.drawCanvasTool = new DrawCanvasTool( { mainPanel } );
        this.sizeMainPanelTool = new SizeMainPanelTool( { mainPanel } );

        this.element.appendChild( this.sizeMainPanelTool.dom() );
        this.element.appendChild( this.drawCanvasTool.dom() );
    }

    dom() {

        return this.element;
    }
}

export { ToolBar };