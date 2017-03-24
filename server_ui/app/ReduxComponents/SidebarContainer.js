import {connect} from 'react-redux';
import {toggleMapping, addEffect} from '../actions/actionCreators';
import Sidebar from './Sidebar';

const mapDispatchToProps = dispatch => {
    return {
        toggleMapping: axis => {
            dispatch(toggleMapping(axis));
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