import {Map} from 'immutable';
import {UPDATE_PARAMETER_VALUE, RECEIVE_LEAP_DATA, UPDATE_MAPPING, REMOVE_MAPPING} from '../actions/actionTypes';
import defaults from '../JSON/defaults.json';

let defaultMaps = {
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
        }),
    })
};
const defaultsKeys = Object.keys(defaults);
for (let i = 0; i < defaultsKeys.length; i++) {
    const thisKey = defaultsKeys[i];
    Object.keys(defaults[thisKey]).forEach(parameter => {
        const paramValue = defaults[thisKey][parameter];
        defaults[thisKey][parameter] = Map({
            paramValue,
            axisName: ''
        });
    });
    defaultMaps[thisKey] = Map(defaults[thisKey]);
};

const initialState = Map(defaultMaps)

const parameters = (state = initialState, action) => {
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
                    stateMutableTemp = stateMutableTemp.updateIn([effectID, paramName, 'paramValue'], value => paramValue);
                }
            }
            return stateMutableTemp.asImmutable();
            break;
        case UPDATE_PARAMETER_VALUE:
            var {effectID, paramName, paramValue} = action.payload;
            return state.updateIn([effectID, paramName, 'paramValue'], value => paramValue);
        case UPDATE_MAPPING:
            var {mapToParameter, axis, effectID, paramName} = action.payload;
            return mapToParameter ?
                state.updateIn([effectID, paramName, 'axisName'], value => axis)
                    .updateIn(['mappings', axis, 'effectID'], value => effectID)
                    .updateIn(['mappings', axis, 'paramName'], value => paramName) :
                state;
        case REMOVE_MAPPING:
            var {axis, effectID, paramName} = action.payload;
            return state.updateIn([effectID, paramName, 'axisName'], value => '')
                .updateIn(['mappings', axis, 'effectID'], value => '')
                .updateIn(['mappings', axis, 'paramName'], value => '');
        default:
            return state;
    }
}

export default parameters;