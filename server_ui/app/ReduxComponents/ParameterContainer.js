import {connect} from 'react-redux';
import {updateParameterValue, setMappingAndEmit, removeMappingAndEmit} from '../actions/actionCreators';
import ParameterScaffold from './ParameterScaffold';

const normalizeParameterValue = (yValue, max, effectID, paramName, dispatch) => {
    let value = yValue < 0 ? 
        0 : yValue > max ? 
        1 : yValue/max
    const paramValue = Math.round(value * 1000)/1000;
    dispatch(updateParameterValue(effectID, paramName, paramValue, {
        io: true
    }));
}

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.getIn(['parameterValues', ownProps.effectID, ownProps.paramName, 'paramValue']),
        axis: state.getIn(['parameterValues', ownProps.effectID, ownProps.paramName, 'axisName']),
        isMapping: state.getIn(['mapping', 'isMapping']),
        axisToMap: state.getIn(['mapping', 'currentAxis'])
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrag: (paramValue, maximum) => {
            normalizeParameterValue(paramValue, maximum, ownProps.effectID, ownProps.paramName, dispatch)
        }, 
        handleClick: (axis) => {
            dispatch(setMappingAndEmit(true, axis, ownProps.effectID, ownProps.paramName));
        },
        removeMapping: (axis, paramName) => {
            dispatch(removeMappingAndEmit(ownProps.effectID, paramName, axis, {
                io: true
            }));
        }
    };
};

const ParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParameterScaffold);

export default ParameterContainer;