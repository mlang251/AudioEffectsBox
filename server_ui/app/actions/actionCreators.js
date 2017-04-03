const types = require('./actionTypes');
const {Map} = require('immutable');

const updateMessage = (message, options = {}) => {
    return {
        type: types.UPDATE_MESSAGE,
        options: options,
        payload: {
            message
        }
    };
};

const updateEffects = (effectsList, options = {}) => {
    return {
        type: types.UPDATE_EFFECTS,
        options: options,
        payload: {
            effectsList
        }
    };
};

const checkUsedIDs = (effectType, usableIDs) => {
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

const addEffectAndEmit = (effectType, effectID, options = {}) => {
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

const removeEffectAndEmit = (effectID, options = {}) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        effects = effects.filter((effect) => effect.get('effectID') != effectID);
        dispatch(updateEffects(effects.asImmutable(), {
            io: true
        }));
    };
};

const reorderEffectsAndEmit = (effectID, direction, options = {}) => {
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

const toggleBypassAndEmit = (effectID, options = {}) => {
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

const toggleSoloAndEmit = (effectID, options = {}) => {
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

const updateCoords = (data, options = {}) => {
    return {
        type: types.UPDATE_COORDS,
        options: options,
        payload: {
            data
        }
    };
}

const receiveLeapData = (data, options = {}) => {
    return (dispatch, getState) => {
        getState().get('xyzMap').forEach((axis, index) => {
            if (axis.get('effectID')) {
                dispatch(updateParameterValue(axis.get('effectID'), axis.get('paramName'), data[index]))
            }
        });
        dispatch(updateCoords(data));
    }
};

const receiveLeapStatus = (address, args, options = {}) => {
    return {
        type: types.RECEIVE_LEAP_STATUS,
        options: options,
        payload: {
            address,
            args
        }
    };
};

const updateParameterValue = (effectID, paramName, paramValue, options = {}) => {
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

const updateMapping = (mapToParameter, axis, effectID, paramName, options = {}) => {
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

const removeMappingAndEmit = (effectID, paramName, axis, options = {}) => {
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

const setMappingAndEmit = (mapToParameter, axis, effectID, paramName, options = {}) => {
    return (dispatch, getState) => {
        const xyzMap = getState().get('xyzMap');
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

module.exports = {
    updateMessage,
    updateEffects,
    checkUsedIDs,
    addEffectAndEmit,
    removeEffectAndEmit,
    reorderEffectsAndEmit,
    toggleBypassAndEmit,
    toggleSoloAndEmit,
    updateCoords,
    receiveLeapData,
    receiveLeapStatus,
    updateParameterValue,
    updateMapping,
    removeMappingAndEmit,
    setMappingAndEmit
}