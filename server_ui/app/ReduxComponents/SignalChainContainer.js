import {connect} from 'react-redux';
import SignalChain from './SignalChain';

const mapStateToProps = state => {
    return {
        effects: state.effects
    };
};

const SignalChainContainer = connect(
    mapStateToProps
)(SignalChain);

export default SignalChainContainer;