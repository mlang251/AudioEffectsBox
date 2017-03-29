import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS, TOGGLE_BYPASS, TOGGLE_SOLO} from '../actions/actionTypes';

const effects = (state = List(), action) => {
    switch (action.type) {
        case ADD_EFFECT:
            var {effectType, effectID} = action.payload;
            return state.push(Map({
                effectType: effectType,
                effectID: effectID,
                isBypassed: false,
                isSoloing: false
            }));
        case REMOVE_EFFECT:
            var {effectID} = action.payload;
            return state.filter((effect) => effect.get('effectID') != effectID);
        case REORDER_EFFECTS:
            var {effectID, direction} = action.payload;
            let effectsList;
            if (direction == 'left') {
                effectsList = state.asMutable().reverse();
            } else {
                effectsList = state.asMutable();
            }
            let isSorted = false;
            effectsList = effectsList.sort((effectA, effectB) => {
                if (!isSorted && effectA.get('effectID') == effectID) {
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
            var {effectID} = action.payload;
            const index = state.findIndex(effect => {
                return effect.get('effectID') == effectID;
            });
            return state.update(index, effect => effect.update('isBypassed', value => !state.get(index).get('isBypassed')));
        case TOGGLE_SOLO:
            var {effectID} = action.payload;
            let isSoloing;
            let indexToUpdate;
            let effectsUpdated = state.asMutable();
            effectsUpdated.forEach((effect, index) => {
                if (effect.get('effectID') == effectID) {
                    isSoloing = effect.get('isSoloing');
                    indexToUpdate = index;
                    return false;
                }
            });
            if (!isSoloing) {
                effectsUpdated.forEach((effect, index) => {
                    if (effect.get('effectID') != effectID) {
                        if (effect.get('isSoloing')) {
                            effectsUpdated.update(index, effect => effect.update('isSoloing', value => false));
                        }
                    } else {
                        effectsUpdated.update(index, effect => effect.update('isSoloing', value => !isSoloing));
                    }
                });
            } else {
                effectsUpdated.update(indexToUpdate, effect => effect.update('isSoloing', value => !isSoloing));
            }
            return effectsUpdated.asImmutable();
        default:
            return state;
    }
}

export default effects;