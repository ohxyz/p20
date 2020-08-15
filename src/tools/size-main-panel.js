import { $c, $q } from '../utils';

class SizeMainPanelTool {

    constructor( { mainPanel } ) {

        this.element = $c(`
            <div id="size-main-panel-tool">
                <form id="size-main-panel-tool__form">
                    <input id="size-main-panel-tool__width" type="text" placeholder="width" />
                    <input id="size-main-panel-tool__height" type="text" placeholder="height" />
                    <button type="submit" id="size-main-panel-tool__button">Update main</button>
                </form>
            </div>
        `);

        this.mainPanel = mainPanel;
        this.init();
    }

    init() {

        $q( '#size-main-panel-tool__form', this.element ).addEventListener( 'submit', event => {

            event.preventDefault();
            const w = $q( '#size-main-panel-tool__width', this.element ).value;
            const h = $q( '#size-main-panel-tool__height', this.element ).value;
            this.mainPanel.update( { width: w, height: h } );
            this.mainPanel.reposition();
        } );
    }

    dom() {

        return this.element;
    }
}

export { SizeMainPanelTool }