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
        message: state.get('message'),
        usedIDs: getUsedIDs(state.get('effects')),
        isConnected: state.get('interactionBox').get('isConnected')
    };
};

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;