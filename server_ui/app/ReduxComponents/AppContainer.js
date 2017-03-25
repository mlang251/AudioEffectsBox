import {connect} from 'react-redux';
import {updateMessage} from '../actions/actionCreators';
import {List} from 'immutable';
import App from './App';

const getUsedIDs = effects => {
    return List(effects.map(effect => {
        return effect.get('effectID');
    }));
};

const mapStateToProps = state => {
    return {
        message: state.message,
        usedIDs: getUsedIDs(state.effects),
        isConnected: state.interactionBox.get('isConnected')
    };
};

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;