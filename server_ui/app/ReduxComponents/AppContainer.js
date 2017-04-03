import {connect} from 'react-redux';
import {updateMessage} from '../actions/actionCreators';
import {List} from 'immutable';
import App from './App';

const mapStateToProps = state => {
    return {
        message: state.get('message'),
        isConnected: state.get('interactionBox').get('isConnected')
    };
};

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;