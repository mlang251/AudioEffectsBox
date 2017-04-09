import {connect} from 'react-redux';
import {updateMapping, checkUsedIDs} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';

/**
 * Maps store dispatch methods to props to pass down to the Sidebar component
 * @param {Function} dispatch - The store.dispatch method for dispatching actions
 * @returns {Object} props - Props to pass down to the Sidebar component
 * @property {Function} props.updateMapping - Dispatches updateMapping with a value of false for mapToParameter, and passes the axis to map
 * @property {Function} props.addEffect - Dispatches checkUsedIDs with the type of effect to check for, and a list of the usable IDs for
 *     the specific effect type
 */
const mapDispatchToProps = (dispatch) => {
    return {
        updateMapping: axis => {
            dispatch(updateMapping(false, axis));
        },
        addEffect: (effectType) => {
            dispatch(checkUsedIDs(effectType, effects[effectType].IDs));
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;