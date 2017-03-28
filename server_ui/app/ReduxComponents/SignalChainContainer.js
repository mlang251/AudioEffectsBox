import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import SignalChain from './SignalChain';

const mapStateToProps = state => {
    return {
        effects: state.effects,
    };
};

const SignalChainContainer = connect(
    mapStateToProps
)(SignalChain);

export default SignalChainContainer;