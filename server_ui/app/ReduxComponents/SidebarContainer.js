import {connect} from 'react-redux';
import {updateMapping, addEffect} from '../actions/actionCreators';
import Sidebar from './Sidebar';
import {effects} from '../JSON/effects.json';
const {ROUTE} = require('../actions/actionOptions').ioTypes;
const {ADD} = require('../actions/actionOptions').ioFlags;

/*TODO: use Thunk to handle an action creator that is a function that passes the effects state slice to the dispatch method.
    take the list of effects, add the new on to the list, and dispatch the computed list to the store, and in the options section
    include the route to emit, or have the server compute the route (probably this is better so there can be a single function
    that checks for soloing/bypassed effects and puts the whole list in the proper format*/
const checkUsedIDs = (effectType, usedIDs, effectsRoute, dispatch) => {
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
                ioFlag: ADD,
                currentRoute: effectsRoute
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
            checkUsedIDs(effectType, ownProps.usedIDs, ownProps.effectsRoute, dispatch);
        }
    };
};

const SidebarContainer = connect(
    null,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;