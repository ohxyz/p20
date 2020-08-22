import { $c, $q } from '../utils';
import { Box } from '../box';

class ShowDnrCoordsTool {

    constructor( { mainPanel } ) {

        const defaultOfContentMainPanel = 'DNR r/t Main Panel X: n/a, Y: n/a';
        const defaultOfContentCanvas = 'DNR r/t Canvas X: n/a, Y: n/a';

        this.element = $c(`
            <div id="show-dnr-coords" class="show-dnr-coords">
                <div id="show-dnr-coords__main-panel" class="show-dnr-coords__main-panel">
                    ${ defaultOfContentMainPanel }
                </div>
                <div id="show-dnr-coords__canvas" class="show-dnr-coords__canvas">
                    ${ defaultOfContentCanvas }
                </div>
            </div>
        `);

        this.mainPanel = mainPanel;

        document.addEventListener( 'mousemove', event => {

            const dnr = this.mainPanel.chm.activeDnr;

            let contentOfMainPanel = defaultOfContentMainPanel;
            let contentOfCanvas = defaultOfContentCanvas;

            if ( dnr ) {

                contentOfMainPanel = `DNR r/t Main Panel X: ${ dnr.offsetX }, Y: ${ dnr.offsetY }`;
                
                const relPos = Box.calcRelPos( dnr.dom(), this.mainPanel.canvas.dom() );
                contentOfCanvas = `DNR r/t Canvas X: ${ relPos.left }, Y: ${ relPos.top }`;
            }

            $q( '#show-dnr-coords__main-panel', this.element ).innerText = contentOfMainPanel;
            $q( '#show-dnr-coords__canvas', this.element ).innerText = contentOfCanvas;
        } );
    }

    dom() {
        
        return this.element;
    }
}

export { ShowDnrCoordsTool };