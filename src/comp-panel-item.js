import { $c } from './utils';

class CompPanelItem {

    name;
    element;

    constructor( args={} ) {

        const { name='Unknown' } = args;

        this.name = name;
        this.element = $c(`
            <div class="comp-panel-item" draggable="true">
                <div class="comp-panel-item__content">${name}</div>
            </div>
        `);

        this.element.addEventListener( 'dragstart', this.handleDragStart.bind(this) );
        this.element.addEventListener( 'drag', this.handleDrag.bind(this) );
        this.element.addEventListener( 'dragend', this.handleDragEnd.bind(this) );
    }

    handleDragStart( event ) {

        // console.log( 'comp drag start' );
        event.dataTransfer.effectAllowed = "copyMove";

        const dataString = JSON.stringify( { type: 'comp-panel-item', name: this.name } )

        event.dataTransfer.setData( 'text/plain', dataString );

    }

    handleDrag( event ) {

        // console.log( 'comp drag' );
    }

    handleDragEnd( event ) {

        // console.log( 'drag end' );
    }

    dom() {

        return this.element;
    }
}

export {

    CompPanelItem
};