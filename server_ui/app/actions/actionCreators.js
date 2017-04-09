import * as types from './actionTypes';
import {Map} from 'immutable';

/**
 * The Immutable.js List datatype. Lists are ordered indexed dense collections, much like a JavaScript Array.
 * @external List
 * @see {@link https://facebook.github.io/immutable-js/docs/#/List}
 */

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * An Immutable Map which represents an effect in the signal chain
 * @typedef {external:Map} Effect
 * @property {String} effectType - The type of effect
 * @property {String} effectID - The unique ID of the effect
 * @property {Boolean} isBypassed - Represents whether or not the effect is currently bypassed
 * @property {Boolean} isSoloing - Represents whether or not the effect is currently soloing
 */

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
 * Creates an action to update the effects list
 * @param {external:List.<Effect>} effectsList - An Immutable List of Immutable Maps which represent the effects in the signal chain
 * @param {*} [options = {}] - An optional object containing meta data for the action
 */
export const updateEffects = (effectsList, options = {}) => {
    return {
        type: types.UPDATE_EFFECTS,
        options,
        payload: {
            effectsList
        }
    };
};

/**
 * Since the system is limitied to 3 effects, this method is used to check with the current list of effects in the signal chain and
 *     decide whether or not the user can add another effect of a specified type. Gets the current list of effects in the signal chain
 *     and creates a List of usedIDs (i.e. the unique IDs of the effects in the chain that are of the specified type). It then
 *     iterates through the usableIDs, and if it encounters an ID that is not in the signal chain, it dispatches addEffectAndEmit with
 *     the effect type and ID to use. Otherwise, if it does not find an ID to use, it alerts the user. Relies on redux-thunk.
 * @param {String} effectType - The type of effect
 * @param {Array.<String>} usableIDs - An array of IDs that can be used for the effect type
 * @see {@link https://github.com/gaearon/redux-thunk}
 */
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

/**
 * Adds an effect to the signal chain. Gets the current effects chain from the store and pushes the new effect to the end of the
 *     signal chain. Dispatches updateEffects with the io option set to true. This causes the action to be routed to the server
 *     through socket.io, so that the server can emit a new effects route to the DSP application. Relies on redux-thunk and
 *     redux-socket.io.
 * @param {String} effectType - The effect type to add
 * @param {String} effectID - The unique ID of the effect to add
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
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
            io: true
        }));
    };
};

/**
 * Removes an effect from the signal chain. Gets the current list of effects from the store and filters through it, deleting the
 *     specific effect. Dispatches updateEffects with the io option set to true. This causes the action to be routed to the server
 *     through socket.io, so that the server can emit a new effects route to the DSP application. Relies on redux-thunk and
 *     redux-socket.io.
 * @param {String} effectID - The ID of the effect to remove from the signal chain
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
export const removeEffectAndEmit = (effectID) => {
    return (dispatch, getState) => {
        let effects = getState().get('effects').asMutable();
        effects = effects.filter((effect) => effect.get('effectID') != effectID);
        dispatch(updateEffects(effects.asImmutable(), {
            io: true
        }));
    };
};

/**
 * Reorders the effects in the signal chain so that a chosen effect is either earlier or later in the signal chain.
 *     Performs the sorting by iterating through the effects in the signal chain, when it finds the specified effect,
 *     it nudges it one step closer to the end of the list. To make this sorting work in both directions, if the direction
 *     value is 'left', it reverses the list, sorts the list as previously described, and then reverses the sorted list.
 *     The boolean, isReordered, is set to true once the reordering takes place so that the effect does not continue to
 *     get pushed to the end of the list. Dispatches updateEffects with the io option set to true. This causes the action 
 *     to be routed to the server through socket.io, so that the server can emit a new effects route to the DSP application. 
 *     Relies on redux-thunk and redux-socket.io.
 * @param {String} effectID - The ID of the effect to reorder in the signal chain
 * @param {String} direction - The direction to move the effect
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
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

/**
 * Toggles the bypass state of a specific effect in the signal chain. First, it finds the index of the specific effect in the
 *     signal chain, and it then toggles the bypass state of that effect. Dispatches updateEffects with the io option set to 
 *     true. This causes the action to be routed to the server through socket.io, so that the server can emit a new effects route
 *     to the DSP application. Relies on redux-thunk and redux-socket.io.
 * @param {String} effectID - The ID of the effect on which to toggle the bypass state
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
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

/**
 * Toggles the solo state of a specific effect in the signal chain. First, it finds the current solo state of the specific 
 *     effect as well as it's index in the signal chain. If the specified effect is going into solo mode, it will check to see 
 *     if another effect is soloing, and if so, turns off solo mode for that effect. Then, when it encounters the specific effect,
 *     it turns on solo mode and turns off bypass mode. Otherwise, if the effect is coming out of solo mode, it turns off that
 *     effect's solo mode. Dispatches updateEffects with the io option set to true. This causes the action to be routed to the 
 *     server through socket.io, so that the server can emit a new effects route to the DSP application. Relies on redux-thunk 
 *     and redux-socket.io.
 * @param {String} effectID - The ID of the effect on which to toggle the solo state
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
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

/**
 * Creates an action to update the value of a specific effect parameter.
 * @param {String} effectID - The unique ID of the effect which contains the specific parameter
 * @param {String} paramName - The parameter whose value is to be set
 * @param {Number} paramValue - The value to set the parameter to
 * @param {Object} [options = {}] - An optional object containing meta data for the action
 */
export const updateParameterValue = (effectID, paramName, paramValue, options = {}) => {
    return {
        type: types.UPDATE_PARAMETER_VALUE,
        options,
        payload: {
            effectID,
            paramName,
            paramValue
        }
    };
};

/**
 * Creates an action to update the mapping state of the overall app
 * @param {Boolean} mapToParameter - Represents whether the app is preparing to map an axis, or if it is mapping an axis to a parameter
 * @param {String} axis - The axis to be mapped
 * @param {String} effectID - The unique ID of the effect containing the parameter to map to
 * @param {String} paramName - The parameter to map the axis to
 * @param {*} [options = {}] An optional object containing meta data for the action
 */
export const updateMapping = (mapToParameter, axis, effectID, paramName, options = {}) => {
    return {
        type: types.UPDATE_MAPPING,
        options,
        payload: {
            mapToParameter,
            axis,
            effectID,
            paramName
        }
    };
}

/**
 * Removes an axis mapping from an effect parameter
 * @param {String} effectID - The unique ID of the effect which contains the mapped parameter
 * @param {String} paramName - The specific parameter to remove the mapping from
 * @param {String} axis - The axis that is being removed from the parameter
 * @param {*} [options = {}] An optional object containing meta data for the action
 */
export const removeMapping = (effectID, paramName, axis, options = {}) => {
    return {
        type: types.REMOVE_MAPPING,
        options,
        payload: {
            effectID,
            paramName,
            axis
        }
    };
};

/**
 * Maps an axis to a parameter, so that motion along the corresponding axis in the Leap's field of vision changes the parameter's value.
 *     Gets the current axis mappings from the parameters in the store. If the axis is already mapped to a parameter, it dispatches
 *     removeMappingAndEmit with the current effectID, paramName, and the axis. It also iterates through all three axes to see if any of
 *     them are currently mapped to the specific parameter that is about to get mapped. If it finds that this condition is true, it calls
 *     removeMappingAndEmit with the effectID, the paramName, and the axis it is mapped to. After both of these checks it dispatches
 *     updateMapping with mapToParameter set to true, along with the axis, effectID, and paramName. For all dispatches within this action
 *     creator, the io option is set to true. This causes the action to be routed to the server through socket.io, so that the server 
 *     can emit a new effects route to the DSP application. Relies on redux-thunk and redux-socket.io.
 * @param {String} axis - The axis to be mapped to a parameter
 * @param {String} effectID - The unique ID of the effect which contains the parameter
 * @param {String} paramName - The name of the parameter to map the axis to
 * @see {@link https://github.com/gaearon/redux-thunk}
 * @see {@link https://github.com/itaylor/redux-socket.io}
 */
export const setMappingAndEmit = (axis, effectID, paramName) => {
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
        dispatch(updateMapping(true, axis, effectID, paramName, {
            io: true
        }));
    };
};