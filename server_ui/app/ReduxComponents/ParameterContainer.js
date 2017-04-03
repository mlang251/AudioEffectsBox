import {connect} from 'react-redux';
import {updateParameterValue, updateMapping} from '../actions/actionCreators';
import Parameter from './Parameter';

const normalizeParameterValue = (yValue, max, effectID, paramName, dispatch) => {
    let value = yValue < 0 ? 
        0 : yValue > max ? 
        1 : yValue/max
    const paramValue = Math.round(value * 1000)/1000;
    dispatch(updateParameterValue(effectID, paramName, paramValue, {
        io: true,
        ioType: UPDATE_PARAMETER,
    }));
}

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.get('parameterValues').get(ownProps.effectID).get(ownProps.paramName),
        isMapping: state.get('mapping').get('isMapping')
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrag: (paramValue, maximum) => {
            normalizeParameterValue(paramValue, maximum, ownProps.effectID, ownProps.paramName, dispatch)
        }, 
        handleClick: () => {
            dispatch(updateMapping(true, ownProps.axisToMap, ownProps.effectID, ownProps.paramName, {
                io: true,
                ioType: XYZ_MAP,
                ioFlag: SET_MAP
            }));
        }
    };
};

const ParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Parameter);

export default ParameterContainer;