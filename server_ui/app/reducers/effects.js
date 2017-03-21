import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS} from '../actions/actions';

const effects = (state = List(), action) => {
    const {effectType, ID, direction} = action.payload;
    switch (action.type) {
        case ADD_EFFECT:
            return state.push(Immutable.Map({
                type: effectType,
                ID: ID,
                isBypassed: false,
                isSoloing: false
            }));
            break;
        case REMOVE_EFFECT:
            return state.filter((effect) => effect.ID != ID);
            break;
        case REORDER_EFFECTS:
            let effectsList;
            if (direction == 'left') {
                effectsList = state.asMutable().reverse();
            } else {
                effectsList = state.asMutable();
            }
            effectsList = effectsList.sort((effectA, effectB) => {
                if (effectA.get('ID') == ID) {
                    return 1;
                } else {
                    return 0;
                }
            });
            if (direction == 'left') {
                effectsList = effectsList.reverse();
            }
            return effectsList.asImmutable(); 
            break;
        default:
            return state;
            break;
    }
}

export default effects;