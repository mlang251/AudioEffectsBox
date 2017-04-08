import * as types from './actionTypes';
import {Map} from 'immutable';



/**
 * Creates an action to update the message
 * @param {String} message  - A message to be displayed in the UI
 */
export const updateMessage = (message) => {
    return {
        type: types.UPDATE_MESSAGE,
        payload: {
            message
        }
    };
};

/**
 * 
 * @param {} effectsList 
 * @param {*} options 
 */
export const updateEffects = (effectsList, options = {}) => {
    return {
        type: types.UPDATE_EFFECTS,
        options: options,
        payload: {
            effectsList
        }
    };
};

export const checkUsedIDs = (effectType, usableIDs) => {
    return (dispatch, getState) => {
        const usedIDs = getState().get('effects').map(effect => {
            return effect.get('effectID');
        });
        for (let i = 0; i < usableIDs.length; i++) {
            const thisID = usableIDs[i];
            if (usedIDs.indexOf(thisID) != -1) {
                if (i == usableIDs.length - 1) {
                    alert( `Maximum of 3 ${effectType} effects allowed`);
                }
            } else {
                dispatch(addEffectAndEmit(effectType, thisID));
                break;
            }
        }
    }
};

export const addEffectAndEmit = (effectType, effectID) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        effects.push(Map({
            effectType: effectType,
            effectID: effectID,
            isBypassed: false,
            isSoloing: false
        }));
        dispatch(updateEffects(effects.asImmutable(), {
            io: true,
            newEffect: effectID
        }));
    };
};

export const removeEffectAndEmit = (effectID) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        effects = effects.filter((effect) => effect.get('effectID') != effectID);
        dispatch(updateEffects(effects.asImmutable(), {
            io: true
        }));
    };
};

export const reorderEffectsAndEmit = (effectID, direction) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects');
        let effectsList;
        if (direction == 'left') {
            effectsList = effects.asMutable().reverse();
        } else {
            effectsList = effects.asMutable();
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
        
        dispatch(updateEffects(effectsList.asImmutable(), {
            io: true
        }));
    };
};

export const toggleBypassAndEmit = (effectID) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        const index = effects.findIndex(effect => {
            return effect.get('effectID') == effectID;
        });
        effects = effects.update(index, effect => effect.update('isBypassed', value => !effects.get(index).get('isBypassed')));
        dispatch(updateEffects(effects.asImmutable(), {
            io: true
        }));
    };
};

export const toggleSoloAndEmit = (effectID) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        let isSoloing;
        let indexToUpdate;
        effects.forEach((effect, index) => {
            if (effect.get('effectID') == effectID) {
                isSoloing = effect.get('isSoloing');
                indexToUpdate = index;
                return false;
            }
        });
        if (!isSoloing) {
            effects.forEach((effect, index) => {
                if (effect.get('effectID') != effectID) {
                    if (effect.get('isSoloing')) {
                        effects = effects.update(index, effect => effect.update('isSoloing', value => false));
                    }
                } else {
                    effects = effects.update(index, effect => effect.update('isSoloing', value => !isSoloing))
                        .update(index, effect => effect.update('isBypassed', value => false));
                }
            });
        } else {
            effects = effects.update(indexToUpdate, effect => effect.update('isSoloing', value => !isSoloing));
        }
        dispatch(updateEffects(effects.asImmutable(), {
            io: true
        }));
    };
};

export const updateParameterValue = (effectID, paramName, paramValue, options = {}) => {
    return {
        type: types.UPDATE_PARAMETER_VALUE,
        options: options,
        payload: {
            effectID,
            paramName,
            paramValue
        }
    };
};

export const updateMapping = (mapToParameter, axis, effectID, paramName, options = {}) => {
    return {
        type: types.UPDATE_MAPPING,
        options: options,
        payload: {
            mapToParameter,
            axis,
            effectID,
            paramName
        }
    };
}

export const removeMappingAndEmit = (effectID, paramName, axis, options = {}) => {
    return {
        type: types.REMOVE_MAPPING,
        options: options,
        payload: {
            effectID,
            paramName,
            axis
        }
    };
};

export const setMappingAndEmit = (mapToParameter, axis, effectID, paramName) => {
    return (dispatch, getState) => {
        const xyzMap = getState().getIn(['parameters', 'mappings']);
        const axes = ['x', 'y', 'z'];
        if (xyzMap.get(axis).get('effectID')) {
            const thisAxis = xyzMap.get(axis);
            dispatch(removeMappingAndEmit(thisAxis.get('effectID'), thisAxis.get('paramName'), axis, {
                io: true
            }));
        }
        for (let i = 0; i < axes.length; i++) {
            const thisAxis = xyzMap.get(axes[i]);
            if (thisAxis.get('effectID') == effectID && thisAxis.get('paramName') == paramName) {
                dispatch(removeMappingAndEmit(effectID, paramName, axes[i], {
                    io: true
                }));
            }
        }
        dispatch(updateMapping(mapToParameter, axis, effectID, paramName, {
            io: true
        }));
    };
};