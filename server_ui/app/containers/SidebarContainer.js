import {connect} from 'react-redux';
import {toggleMapping, addEffect} from '../actions/actionCreators';
import Sidebar from '../components/Sidebar';

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
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;