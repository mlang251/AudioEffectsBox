import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS, TOGGLE_BYPASS, TOGGLE_SOLO} from '../actions/actionTypes';

const effects = (state = List(), action) => {
    const {effectType, effectID, direction} = action.payload;
    switch (action.type) {
        case ADD_EFFECT:
            return state.push(Map({
                effectType: effectType,
                effectID: effectID,
                isBypassed: false,
                isSoloing: false
            }));
        case REMOVE_EFFECT:
            return state.filter((effect) => effect.get('effectID') != effectID);
        case REORDER_EFFECTS:
            let effectsList;
            if (direction == 'left') {
                effectsList = state.asMutable().reverse();
            } else {
                effectsList = state.asMutable();
            }
            let isSorted = false;
            effectsList = effectsList.sort((effectA, effectB) => {
                if (effectA.get('effectID') == effectID && !isSorted) {
                    isSorted = true;
                    return 1;
                } else {
                    return 0;
                }
            });
            if (direction == 'left') {
                effectsList = effectsList.reverse();
            }
            return effectsList.asImmutable(); 
        case TOGGLE_BYPASS:
        case TOGGLE_SOLO:
            const index = state.findIndex(effect => {
                return effect.get('effectID') == effectID;
            });
            return action.type == TOGGLE_BYPASS ?
                state.update(index, effect => effect.update('isBypassed', value => !state.get(index).get('isBypassed'))) :
                state.update(index, effect => effect.update('isSoloing', value => !state.get(index).get('isSoloing')));
        default:
            return state;
    }
}

export default effects;