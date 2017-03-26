import {connect} from 'react-redux';
import {toggleMapping, updateParameterValue, updateMapping, removeMapping} from '../actions/actionCreators';
import Parameter from './Parameter';

const mapStateToProps = state => {
    return {
        isMapping: state.mapping.get('isMapping')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleDrag: (effectID, paramName, paramValue) => {
            dispatch(updateParameterValue(effectID, paramName, paramValue));
        }, 
        handleClick: (effectID, paramName, axis) => {
            dispatch(updateMapping(true, axis, effectID, paramName));
        }
    };
};

const ParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Parameter);

export default ParameterContainer;