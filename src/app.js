import { $q, $c, $a } from './utils';
import { ToolBar } from './tool-bar';
import { MainPanel } from './main-panel';
import { CompPanel } from './comp-panel';
import { StatusBar } from './status-bar';
import { PropPanel } from './prop-panel';

class App {

    element;
    mainPanel;
    compPanel;
    toolBar;
    statusBar;
    propPanel;

    constructor() {

        this.element = $q( '#app' );
        this.mainContainerElement = $c( '<div class="main-container">' );

        this.mainPanel = new MainPanel();
        this.compPanel = new CompPanel();
        this.toolBar = new ToolBar( { mainPanel: this.mainPanel } );
        this.statusBar = new StatusBar( { mainPanel: this.mainPanel } );
        this.propPanel = new PropPanel( { mainPanel: this.mainPanel } );
    }

    init() {

        $a( this.element, 
            this.toolBar.dom(), 
            this.statusBar.dom(),
            this.compPanel.dom(),
            this.propPanel.dom(),
            $a( this.mainContainerElement, this.mainPanel.dom() )
        );

        this.mainPanel.design.center();

        // window.addEventListener( 'resize', this.handleResize.bind(this) );
    }

    handleResize() {
        
    }
}

export {

    App
};