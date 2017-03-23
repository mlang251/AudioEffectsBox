import {connect} from 'react-redux';
import {updateMapping, addEffect} from '../actions/actionCreators';
import Sidebar from './Sidebar';

const mapDispatchToProps = dispatch => {
    return {
        updateMapping: axis => {
            dispatch(updateMapping(false, axis));
        },
        addEffect: (effectType, effectID) => {
            dispatch(addEffect(effectType, effectID));
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;