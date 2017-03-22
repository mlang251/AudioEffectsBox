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

export const toggleMapping = (axisName) => {
    return {
        type: types.TOGGLE_MAPPING,
        payload: {
            axisName
        }
    };
};

export const addEffect = (effectType, ID) => {
    return {
        type: types.ADD_EFFECT,
        payload: {
            effectType,
            ID
        }
    };
};

export const removeEffect = (ID) => {
    return {
        type: types.REMOVE_EFFECT,
        payload: {
            ID
        }
    };
};

export const toggleBypass = (ID) => {
    return {
        type: types.TOGGLE_BYPASS,
        payload: {
            ID
        }
    };
};

export const reorderEffects = (effectID, direction) => {
    return {
        type: types.REORDER_EFFECTS,
        payload: {
            ID,
            direction
        }
    };
};

export const toggleSolo = (ID) => {
    return {
        type: types.TOGGLE_SOLO,
        payload: {
            ID
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

export const mapToParameter = (effectID, paramName, axis) => {
    return {
        type: types.MAP_TO_PARAMETER,
        payload: {
            effectID,
            paramName,
            axis
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