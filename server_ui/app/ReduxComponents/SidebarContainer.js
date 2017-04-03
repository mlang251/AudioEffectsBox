import {connect} from 'react-redux';
import {updateMapping, addEffectAndEmitRoute} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';

const checkUsedIDs = (effectType, usedIDs, effectsRoute, dispatch) => {
    const usableIDs = effects[effectType].IDs;
    for (let i = 0; i < usableIDs.length; i++) {
        const thisID = usableIDs[i];
        if (usedIDs.indexOf(thisID) != -1) {
            if (i == usableIDs.length - 1) {
                alert( `Maximum of 3 ${effectType} effects allowed`);
            }
        } else {
            dispatch(addEffectAndEmitRoute(effectType, thisID));
            break;
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateMapping: axis => {
            dispatch(updateMapping(false, axis));
        },
        addEffect: (effectType) => {
            checkUsedIDs(effectType, ownProps.usedIDs, ownProps.effectsRoute, dispatch);
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;