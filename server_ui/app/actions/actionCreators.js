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

export const addEffect = (effectType, effectID, options = {}) => {
    return {
        type: types.ADD_EFFECT,
        options: options,
        payload: {
            effectType,
            effectID
        }
    };
};

export const removeEffect = (effectID, options = {}) => {
    return {
        type: types.REMOVE_EFFECT,
        options: options,
        payload: {
            effectID
        }
    };
};

export const reorderEffects = (effectID, direction, options = {}) => {
    return {
        type: types.REORDER_EFFECTS,
        options: options,
        payload: {
            effectID,
            direction
        }
    };
};

export const toggleBypass = (effectID, options = {}) => {
    return {
        type: types.TOGGLE_BYPASS,
        options: options,
        payload: {
            effectID
        }
    };
};

export const toggleSolo = (effectID, options = {}) => {
    return {
        type: types.TOGGLE_SOLO,
        options: options,
        payload: {
            effectID
        }
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