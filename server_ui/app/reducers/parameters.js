import {Map} from 'immutable';
import {UPDATE_PARAMETER_VALUE, RECEIVE_LEAP_DATA, UPDATE_MAPPING, REMOVE_MAPPING} from '../actions/actionTypes';
import defaults from '../JSON/defaults.json';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * Contains information about a current axis mapping
 * @typedef {external:Map} AxisMapping
 * @property {String} AxisMapping.effectID - The ID of the effect which contains the parameter the axis is mapped to
 * @property {String} AxisMapping.paramName - The parameter the axis is mapped to
 */

/**
 * Contains information about a parameter's value and mapping
 * @typedef {external:Map} Parameter
 * @property {Number} Parameter.paramValue - The current value of the parameter
 * @property {String} Parameter.axisName - The axis the parameter is mapped to
 */

/**
 * Contains the parameters belonging to an effect
 * @typedef {external:Map.<String, Parameter>} Effect
 */

/**
 * Creates the initial state of the parameters
 * @typedef {external:Map} State
 * @property {external:Map} State.mappings - Contains the current axis mappings
 * @property {AxisMapping} State.mappings.x - Contains information about the current mapping of the x axis
 * @property {AxisMapping} State.mappings.y - Contains information about the current mapping of the y axis
 * @property {AxisMapping} State.mappings.z - Contains information about the current mapping of the z axis
 * @property {external:Map.<String, Effect>} State.effects - Contains the current state of the parameters
 */
export const createInitialState = () => {
    let tempState = Map({
        mappings: Map({
            x: Map({
                effectID: '',
                paramName: ''
            }),
            y: Map({
                effectID: '',
                paramName: ''
            }),
            z: Map({
                effectID: '',
                paramName: ''
            })
        }),
        effects: Map()
    }).asMutable();
    const defaultsKeys = Object.keys(defaults);
    for (let i = 0; i < defaultsKeys.length; i++) {
        const thisKey = defaultsKeys[i];
        let effect = Map({}).asMutable();
        Object.keys(defaults[thisKey]).forEach(parameter => {
            const paramValue = defaults[thisKey][parameter];
            effect = effect.set(parameter, Map({
                paramValue,
                axisName: ''
            }));
        });
        tempState = tempState.setIn(['effects', thisKey], effect.asImmutable());
    };
    return tempState.asImmutable();
}

/**
 * Updates the state of the parameters. If the action type is RECEIVE_LEAP_DATA, the reducer has to check to see if any parameters are
 *     mapped to axes of the Leap's field of vision. It iterates through state.mappings and determines which parameters are mapped to
 *     axes, and which axis is controlling the parameters value. If it finds parameters that are mapped, it updates the parameter
 *     value with the corresponding value in the Leap data. If the action type is UPDATE_PARAMETER_VALUE, the reducer updates the
 *     corresponding parameter value. If the action type is UPDATE_MAPPING, the reducer first determines whether or not it should
 *     be mapping an axis to a parameter by checking to see if mapToParameter is true. If it is, it updates the axisName field of
 *     the proper parameter, as well as updating the effectID and paramName in state.mappings. If the action type is REMOVE_MAPPING,
 *     the reducer sets the value of the specific parameter's axisName property to an empty string, and sets the effectID and 
 *     paramName in the proper axis of state.mappings to be empty strings.
 * @param {State} state - The current state of the parameters
 * @param {Object} action - The action that is calling the reducer
 */
const parameters = (state = createInitialState(), action) => {
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            let stateMutableTemp = state.asMutable();
            const {data} = action.payload;
            const axes = ['x', 'y', 'z'];
            const mappings = stateMutableTemp.get('mappings');
            for (let i = 0; i < data.length; i++) {
                const axisMapping = mappings.get(axes[i]);
                if (axisMapping.get('effectID') != '') {
                    const effectID = axisMapping.get('effectID');
                    const paramName = axisMapping.get('paramName');
                    const paramValue = data[i];
                    stateMutableTemp = stateMutableTemp.updateIn(['effects', effectID, paramName, 'paramValue'], value => paramValue);
                }
            }
            return stateMutableTemp.asImmutable();
            break;
        case UPDATE_PARAMETER_VALUE:
            var {effectID, paramName, paramValue} = action.payload;
            return state.updateIn(['effects', effectID, paramName, 'paramValue'], value => paramValue);
        case UPDATE_MAPPING:
            var {mapToParameter, axis, effectID, paramName} = action.payload;
            return mapToParameter ?
                state.updateIn(['effects', effectID, paramName, 'axisName'], value => axis)
                    .updateIn(['mappings', axis, 'effectID'], value => effectID)
                    .updateIn(['mappings', axis, 'paramName'], value => paramName) :
                state;
        case REMOVE_MAPPING:
            var {axis, effectID, paramName} = action.payload;
            return state.updateIn(['effects', effectID, paramName, 'axisName'], value => '')
                .updateIn(['mappings', axis, 'effectID'], value => '')
                .updateIn(['mappings', axis, 'paramName'], value => '');
        default:
            return state;
    }
}

export default parameters;