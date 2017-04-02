import * as types from './actionTypes';
// Action creators

export const updateMessage = (message, options = {}) => {
    return {
        type: types.UPDATE_MESSAGE,
        options: options,
        payload: {
            message
        }
    };
};

export const updateEffects = (effectsList, options = {}) => {
    return {
        type: types.UPDATE_EFFECTS,
        options: options,
        payload: {
            effectsList
        }
    };
};

export const addEffectAndEmitRoute = (effectType, effectID, options = {}) => {
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
            ioType: ROUTE
        }));
    };
};

export const removeEffectAndEmitRoute = (effectID, options = {}) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        effects.filter((effect) => effect.get('effectID') != effectID);
        dispatch(updateEffects(effects.asImmutable(), {
            io: true,
            ioType: ROUTE
        }));
    };
};

export const reorderEffectAndEmitRoute = (effectID, direction, options = {}) => {
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
            io: true,
            ioType: ROUTE
        }));
    };
};

export const toggleBypassAndEmitRoute = (effectID, options = {}) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        const index = state.findIndex(effect => {
            return effect.get('effectID') == effectID;
        });
        effects.update(index, effect => effect.update('isBypassed', value => !effects.get(index).get('isBypassed')));
        dispatch(updateEffects(effects.asImmutable(), {
            io: true,
            ioType: ROUTE
        }));
    };
};

export const toggleSoloAndEmitRoute = (effectID, options = {}) => {
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
                        effects.update(index, effect => effect.update('isSoloing', value => false));
                    }
                } else {
                    effects.update(index, effect => effect.update('isSoloing', value => !isSoloing));
                }
            });
        } else {
            effects.update(indexToUpdate, effect => effect.update('isSoloing', value => !isSoloing));
        }
        dispatch(updateEffects(effects.asImmutable(), {
            io: true,
            ioType: ROUTE
        }));
    };
};

export const receiveLeapData = (data, options = {}) => {
    return {
        type: types.RECEIVE_LEAP_DATA,
        options: options,
        payload: {
            data
        }
    };
};

export const receiveLeapStatus = (address, args, options = {}) => {
    return {
        type: types.RECEIVE_LEAP_STATUS,
        options: options,
        payload: {
            address,
            args
        }
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
};

export const removeMapping = (axis, options = {}) => {
    return {
        type: types.REMOVE_MAPPING,
        options: options,
        payload: {
            axis
        }
    };
};