import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import root from './reducers/root';
import AppContainer from './components/AppContainer';

const socket = io('http://localhost:3000');
const socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => action.options.io);
const store = createStore(
    root,
    applyMiddleware(thunk, socketIoMiddleware)
);

render(
    <Provider store = {store}>
        <AppContainer />
    </Provider>,
    document.getElementById('reactContainer')
);
