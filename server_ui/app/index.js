import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import root from './reducers/root';
import AppContainer from './ReduxComponents/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const socket = io('http://localhost:3000');
const socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => action.options.io);
const store = applyMiddleware(socketIoMiddleware)(createStore)(root);

injectTapEventPlugin();

render(
    <MuiThemeProvider>
        <Provider store = {store}>
            <AppContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('reactContainer')
);
