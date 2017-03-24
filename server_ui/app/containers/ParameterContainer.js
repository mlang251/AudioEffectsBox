import {connect} from 'react-redux';
import {toggleMapping, updateParameterValue, mapToParameter, removeMapping} from '../actions/actionCreators';
import Parameter from '../components/Parameter';

const mapStateToProps = state => {
    return {
        parameterValues: state.parameterValues,
        mapping: state.mapping,
        xyzMap: state.xyzMap
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMapping: () => {
            dispatch(toggleMapping());
        },
        updateParameterValue: (effectID, paramName, paramValue) => {
            dispatch(updateParameterValue(effectID, paramName, paramValue));
        }, 
        mapToParameter: (effectID, paramName, axis) => {
            dispatch(mapToParameter((effectID, paramName, axis)));
        },
        removeMapping: axis => {
            dispatch(removeMapping(axis));
        }
    };
};

const ParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Parameter);

export default ParameterContainer;