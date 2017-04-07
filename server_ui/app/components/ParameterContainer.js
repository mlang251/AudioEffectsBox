import {connect} from 'react-redux';
import {updateParameterValue, setMappingAndEmit, removeMapping} from '../actions/actionCreators';
import ParameterScaffold from './ParameterScaffold';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * Normalizes the received value from updating the parameter's value, normalizes it in the range of 0-1 inclusive, and rounds to 
 *     three decimal places. Dispatches updateParameterValue with the effectID, the paramName, and the normalized value.
 * @param {Number} yValue - The new value of the parameter, this number is received as the absolute y position of the fader with
 *     respect to it's containing block in the Parameter component
 * @param {Number} max - The maximum value the fader can reach with respect to it's containing block
 * @param {String} effectID - The ID of the effect this parameter belongs to
 * @param {String} paramName - The name of the parameter that is updating it's value
 * @param {Function} dispatch - The store.dispatch method
 */
const normalizeParameterValue = (yValue, max, effectID, paramName, dispatch) => {
    let value = yValue < 0 ? 
        0 : yValue > max ? 
        1 : yValue/max
    const paramValue = Math.round(value * 1000)/1000;
    dispatch(updateParameterValue(effectID, paramName, paramValue, {
        io: true
    }));
}

/**
 * Maps the state contained in the store to props to pass down to the ParameterScaffold component
 * @param {external:Map} state - The state contained in the store
 * @param {Object} ownProps - Props passed down from the Effect component
 * @property {String} ownProps.effectID - The ID of the effect that contains this parameter
 * @property {String} ownProps.paramName - The name of this parameter
 * @returns {Object} props - Props to pass down to the ParameterScaffold component
 * @property {Number} props.value - The value of this parameter
 * @property {String} props.axis - The axis this parameter is mapped to. This is an empty string if the parameter is not mapped
 * @property {Boolean} props.isMapping - Represents whether or not the app is in axis mapping mode
 * @property {String} props.axisToMap - The axis that is currently being mapped to a parameter. This is an empty string if the app
 *     is not currently in axis mapping mode
 */
const mapStateToProps = (state, ownProps) => {
    return {
        value: state.getIn(['parameters', 'effects', ownProps.effectID, ownProps.paramName, 'paramValue']),
        axis: state.getIn(['parameters', 'effects', ownProps.effectID, ownProps.paramName, 'axisName']),
        isMapping: state.getIn(['mapping', 'isMapping']),
        axisToMap: state.getIn(['mapping', 'currentAxis'])
    };
};

/**
 * Maps store dispatch methods to props to pass down to the ParameterScaffold component
 * @param {Function} dispatch - The store.dispatch method for dispatching actions
 * @param {Object} ownProps - Props passed down from the Effect component
 * @property {String} ownProps.effectID - The ID of the effect that contains this parameter
 * @property {String} ownProps.paramName - The name of this parameter
 * @returns {Object} props - Props to pass down to the ParameterScaffold component
 * @property {Function} props.handleDrag - Calls normalizeParameterValue with the received value, the received maximum, the ID of
 *     the effect this parameter belongs to, the parameter name, and the store.dispatch method
 * @property {Function} props.handleClick - Dispatches setMappingAndEmit with the axis to map to this parameter, the ID of the 
 *     effect this parameter belongs to, and the parameter name
 * @property {Function} props.removeMapping - Dispatches removeMapping with the ID of the effect this parameter belongs to, the name
 *     of the parameter, and the axis that is currently mapped to this parameter
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrag: (paramValue, maximum) => {
            normalizeParameterValue(paramValue, maximum, ownProps.effectID, ownProps.paramName, dispatch)
        }, 
        handleClick: (axis) => {
            dispatch(setMappingAndEmit(axis, ownProps.effectID, ownProps.paramName));
        },
        removeMapping: (axis, paramName) => {
            dispatch(removeMapping(ownProps.effectID, paramName, axis, {
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