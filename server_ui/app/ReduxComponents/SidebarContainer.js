import {connect} from 'react-redux';
import {updateMapping, addEffect} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';
const {ROUTE} = require('../actions/actionOptions').ioTypes;
const {ADD} = require('../actions/actionOptions').ioFlags;

const checkUsedIDs = (effectType, usedIDs, dispatch) => {
    const usableIDs = effects[effectType].IDs;
    for (let i = 0; i < usableIDs.length; i++) {
        const thisID = usableIDs[i];
        if (usedIDs.indexOf(thisID) != -1) {
            if (i == usableIDs.length - 1) {
                alert( `Maximum of 3 ${effectType} effects allowed`);
            }
        } else {
            dispatch(addEffect(effectType, thisID, {
                io: true,
                ioType: ROUTE,
                ioFlag: ADD
            }));
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
            checkUsedIDs(effectType, ownProps.usedIDs, dispatch);
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;