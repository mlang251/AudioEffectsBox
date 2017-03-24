import {connect} from 'react-redux';
import {updateMessage} from '../actions/actionCreators';
import App from './App';

const mapStateToProps = state => {
    return {
        message: state.message
    };
};

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;