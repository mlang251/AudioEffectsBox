import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import app from './reducers/app';
import AppContainer from './components/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
    <MuiThemeProvider>
        <Provider store = {createStore(app)}>
            <AppContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('reactContainer')
);
