import {connect} from 'react-redux';
import {updateParameterValue, updateMapping} from '../actions/actionCreators';
import Parameter from './Parameter';

const mapStateToProps = state => {
    return {
        isMapping: state.mapping.get('isMapping')
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrag: (paramValue) => {
            dispatch(updateParameterValue(ownProps.effectID, ownProps.paramName, paramValue));
        }, 
        handleClick: () => {
            dispatch(updateMapping(true, ownProps.axis, ownProps.effectID, ownProps.paramName));
        }
    };
};

const ParameterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Parameter);

export default ParameterContainer;