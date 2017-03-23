import * as types from './actionTypes';
// Action creators

export const updateMessage = (message) => {
    return {
        type: types.UPDATE_MESSAGE,
        payload: {
            message
        }
    };
};

export const addEffect = (effectType, effectID) => {
    return {
        type: types.ADD_EFFECT,
        payload: {
            effectType,
            effectID
        }
    };
};

export const removeEffect = (effectID) => {
    return {
        type: types.REMOVE_EFFECT,
        payload: {
            effectID
        }
    };
};

export const reorderEffects = (effectID, direction) => {
    return {
        type: types.REORDER_EFFECTS,
        payload: {
            effectID,
            direction
        }
    };
};

export const toggleBypass = (effectID) => {
    return {
        type: types.TOGGLE_BYPASS,
        payload: {
            effectID
        }
    };
};

export const toggleSolo = (effectID) => {
    return {
        type: types.TOGGLE_SOLO,
        payload: {
            effectID
        }
    };
};

export const receiveLeapData = (data) => {
    return {
        type: types.RECEIVE_LEAP_DATA,
        payload: {
            data
        }
    };
};

export const receiveLeapStatus = (address, args) => {
    return {
        type: types.RECEIVE_LEAP_STATUS,
        payload: {
            address,
            args
        }
    };
};

export const updateParameterValue = (effectID, paramName, paramValue) => {
    return {
        type: types.UPDATE_PARAMETER_VALUE,
        payload: {
            effectID,
            paramName,
            paramValue
        }
    };
};

export const updateMapping = (mapToParameter, axis, effectID, paramName) => {
    return {
        type: types.UPDATE_MAPPING,
        payload: {
            mapToParameter,
            axis,
            effectID,
            paramName
        }
    };
};

export const removeMapping = (axis) => {
    return {
        type: types.REMOVE_MAPPING,
        payload: {
            axis
        }
    };
};