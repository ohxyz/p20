import './scss/index.scss';
import { App } from './app';
import { $q } from './utils';
import { Dnr } from './dnr';

const app = new App();
app.init();

const ch = new Dnr( {

    x: 0,
    y: 0,
    id: 'a', 
    backgroundColor: '#00ff0050',
    content: 'main 1'
} );

const ch2 = new Dnr( {

    x: 50,
    y: 400,
    id: 'b',
    borderWidth: 10,
    backgroundColor: '#00ffff30',
    content: '<i>main 2</i>'
} );

// app.mainPanel.addCompHolder( ch, ch2 );

