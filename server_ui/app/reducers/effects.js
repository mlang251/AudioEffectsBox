import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS} from '../actions/actions';

const addEffect = (state) => {
    const usableIDs = this.effects.getIn(['effects', effectType, 'IDs']);
    const usedIDs = state.map(effect => effect.ID);
    usableIDs.forEach((curID, index) => {
        if (usedIDs.includes(curID)) {
            if (index == usableIDs.size - 1) {
                alert(`Maximum number of ${effectType} effects reached.`);
            }
        } else {
            const newEffectsArray = this.state.effects.push(Immutable.fromJS({
                type: effectType,
                ID: curID,
                isBypassed: false,
                isSoloing: false
            }));
            this.setState(({usedIDs, effects}) => ({
                usedIDs: usedIDs.push(curID).sort(),
                effects: newEffectsArray
            }));
            this.createRoutes(newEffectsArray);
            return false;
        }
    });
}

const effects = (state = List(), action) => {
    switch (action.type) {
        case ADD_EFFECT:
            return state.push(addEffect(state));
        case REMOVE_EFFECT:
        case REORDER_EFFECTS:
        default:
            return state;
    }
}

export default effects;