import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <AppContainer />
    </MuiThemeProvider>,
    document.getElementById('reactContainer')
);
