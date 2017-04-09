const List = require('immutable').List;

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
 * Iterates through a list of effects and creates an object of routes to send to the DSP application. It first checks to see if
 *     any effect is soloing. If it finds a soloing effect, it only creates a route object with that effect. Otherwise, it iterates
 *     through the provided list of effects. The method routes the raw audio signal input to the first effect that is to be audible,
 *     it then subsequently adds the rest of the effects that are not being bypassed, and routes the output of the final effect to 
 *     the computer output. *     
 * @param {external:List.<Effect>} effectsList - The list of effects
 * @returns {Object.<String, String>} routeObj - The route object to send to the DSP application. Describes the flow of the audio
 *     signal between system input, audio effects, and system output.
 */
const createRoutes = (effectsList = List()) => {
    //TODO: for some reason the immutable effectsList is being converted into plain JS
    let routeObj = {input: 'output'};
    const soloEffect = effectsList.filter(effect => {
        return effect.isSoloing;
    });
    const effectsToRoute = !soloEffect.isEmpty() ? soloEffect : effectsList;
    let isFirstInChain = true;
    effectsToRoute.forEach((effect, index) => {
        if (!effect.isBypassed) {
            const effectID = effect.effectID;
            if (isFirstInChain) {
                routeObj.input = effectID;
                isFirstInChain = false;
            }
            routeObj[effectID] = effectsToRoute[index + 1] ? effectsToRoute[index + 1].effectID : 'output';
        }
    });
    return routeObj;
}

/**
 * Creates a data object to describe a change in parameter mapping. Depending on the value of the method parameter, the function can
 *     either add or remove an axis mapping.
 * @param {String} method - The method to use when updating an axis mapping. A method of 'remove' will remove a mapping from a parameter,
 *     and a method of 'set' will apply an axis mapping to a parameter
 * @param {String} effectID - The ID of the effect which contains the parameter that is updating it's mapping
 * @param {String} paramName - The name of the parameter that is updating it's mapping
 * @param {String} axis - The axis that is being mapped to a parameter. If the parameter is removing a mapping, the axis
 *     value will be an empty string
 * @returns {Object.<String, String>} data - The parameter mapping data to send to the DSP application
 * @property {String} data.effectID - The ID of the effect which contains the parameter that is updating it's mapping
 * @property {String} data.param - The name of the parameter that is updating it's mapping
 * @property {String} data.effectID - The new value to set as the mapped axis (or empty string) for the parameter
 */
const updateMapping = (method, effectID, paramName, axis) => {
    let data = {
        effectID,
        param: paramName,
        axis: ''
    };
    switch (method) {
        case 'remove':
            data.axis = 'n';
            break;
        case 'set':
            data.axis = axis;
            break;
        default:
            console.log('Unknown mapping method');
            break;
    }
    return data;
};

/**
 * Creates an object that describes a parameter's value
 * @param {String} effectID - The ID of the effect which contains the parameter that is updating it's value
 * @param {String} paramName - The name of the parameter that is updating it's value
 * @param {Number} paramValue - The new value of the parameter
 * @returns {Object} data - The parameter value data to be sent to the DSP application
 * @property {String} data.effectID - The ID of the effect which contains the parameter that is updating it's value
 * @property {String} data.paramName - The name of the parameter that is updating it's parameter
 * @property {Number} data.paramValue - The new value of the parameter
 */
const updateParameter = (effectID, paramName, paramValue) => {
    return {
        effectID,
        paramName,
        paramValue
    };
}

module.exports = {
    createRoutes,
    updateMapping,
    updateParameter
}