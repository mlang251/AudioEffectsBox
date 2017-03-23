import {connect} from 'react-redux';
import {updateMapping, addEffect} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';

const checkUsedIDs = (effectType, usedIDs) => {
    const usableIDs = effects[effectType].IDs;
    for (let i = 0; i < usableIDs.length; i++) {
        const thisID = usableIDs[i];
        if (i == usableIDs.length) {
            alert(`Maximum of 3 ${effectType} effects allowed`);
        } else if (!usedIDs.indexOf(thisID)) {
            dispatch(addEffect(effectType, thisID));
            break;
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateMapping: axis => {
            dispatch(updateMapping(false, axis));
        },
        addEffect: (effectType, effectID) => {
            checkUsedIDs(effectType, ownProps.usedIDs);
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;