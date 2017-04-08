import {connect} from 'react-redux';
import {updateMapping, checkUsedIDs} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';

const mapDispatchToProps = (dispatch, ownProps) => {
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