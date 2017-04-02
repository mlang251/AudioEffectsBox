// import * as types from '../../actions/actionTypes';
// import * as actions from '../../actions/actionCreators';

// describe('actions', () => {
//     test('should create an action to update the message', () => {
//         const message = 'Hello World';
//         const expectedAction = {
//             type: types.UPDATE_MESSAGE,
//             options: {
//                 io: true
//             },
//             payload: {
//                 message
//             }
//         };
//         expect(actions.updateMessage(message, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to add an effect', () => {
//         const effectType = 'reverb';
//         const effectID = 'reverb1';
//         const expectedAction = {
//             type: types.ADD_EFFECT,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectType,
//                 effectID
//             }
//         };
//         expect(actions.addEffect(effectType, effectID, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to remove an effect', () => {
//         const effectID = 'reverb1';
//         const expectedAction = {
//             type: types.REMOVE_EFFECT,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectID
//             }
//         };
//         expect(actions.removeEffect(effectID, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to reorder effects', () => {
//         const effectID = 'reverb1';
//         const direction = 'left';
//         const expectedAction = {
//             type: types.REORDER_EFFECTS,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectID,
//                 direction
//             }
//         };
//         expect(actions.reorderEffects(effectID, direction, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to toggle an effect bypass', () => {
//         const effectID = 'reverb1';
//         const expectedAction = {
//             type: types.TOGGLE_BYPASS,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectID
//             }
//         };
//         expect(actions.toggleBypass(effectID, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to toggle an effect solo', () => {
//         const effectID = 'reverb1';
//         const expectedAction = {
//             type: types.TOGGLE_SOLO,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectID
//             }
//         };
//         expect(actions.toggleSolo(effectID, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to receive Leap data', () => {
//         const data = [0.281, 0.589, 0.354];
//         const expectedAction = {
//             type: types.RECEIVE_LEAP_DATA,
//             options: {
//                 io: true
//             },
//             payload: {
//                 data
//             }
//         };
//         expect(actions.receiveLeapData(data, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to receive Leap status', () => {
//         const address = '/BoundStatus';
//         const args = [1];
//         const expectedAction = {
//             type: types.RECEIVE_LEAP_STATUS,
//             options: {
//                 io: true
//             },
//             payload: {
//                 address,
//                 args
//             }
//         };
//         expect(actions.receiveLeapStatus(address, args, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to update a parameter value', () => {
//         const effectID = 'reverb1';
//         const paramName = 'Liveness';
//         const paramValue = 0.874;
//         const expectedAction = {
//             type: types.UPDATE_PARAMETER_VALUE,
//             options: {
//                 io: true
//             },
//             payload: {
//                 effectID,
//                 paramName,
//                 paramValue
//             }
//         };
//         expect(actions.updateParameterValue(effectID, paramName, paramValue, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to turn on axis mapping mode', () => {
//         const mapToParameter = false;
//         const axis = 'x';
//         const effectID = undefined;
//         const paramName = undefined;
//         const expectedAction = {
//             type: types.UPDATE_MAPPING,
//             options: {
//                 io: true
//             },
//             payload: {
//                 mapToParameter,
//                 axis
//             }
//         };
//         expect(actions.updateMapping(mapToParameter, axis, effectID, paramName, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to map an axis to a parameter', () => {
//         const mapToParameter = true;
//         const axis = 'x';
//         const effectID = 'reverb1';
//         const paramName = 'Liveness';
//         const expectedAction = {
//             type: types.UPDATE_MAPPING,
//             options: {
//                 io: true
//             },
//             payload: {
//                 mapToParameter,
//                 axis,
//                 effectID,
//                 paramName
//             }
//         };
//         expect(actions.updateMapping(mapToParameter, axis, effectID, paramName, {io: true})).toEqual(expectedAction);
//     });
//     test('should create an action to remove an axis mapping', () => {
//         const axis = 'x';
//         const expectedAction = {
//             type: types.REMOVE_MAPPING,
//             options: {
//                 io: true
//             },
//             payload: {
//                 axis
//             }
//         };
//         expect(actions.removeMapping(axis, {io: true})).toEqual(expectedAction);
//     });
// });