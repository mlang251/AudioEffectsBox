import {connect} from 'react-redux';
import {updateMessage} from '../actions/actionCreators';
import App from '../components/App';

const mapStateToProps = state => {
    return {
        message: state.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessage: message => {
            dispatch(updateMessage(message));
        }
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;