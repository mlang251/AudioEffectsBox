import {Map} from 'immutable';
import emitReducer from '../../reducers/emit';

describe('emit reducer', () => {
    test('should return initial state', () => {
        expect(emitReducer(undefined, {
            type: undefined,
            data: undefined
        })).toEqual(Map());
    });
    test('should handle route', () => {
        const data = {input: 'output'};
        expect(emitReducer(undefined, {
            type: 'route',
            data
        })).toEqual(Map({
            route: data
        }));
    });
    test('should handle updateParam', () => {
        const data = {
            effectID: 'reverb1',
            paramName: 'Liveness',
            paramValue: 0.254
        }
        expect(emitReducer(undefined, {
            type: 'updateParam',
            data
        })).toEqual(Map({
            updateParam: data
        }));
    });
    test('should handle xyzMap', () => {
        const data = {
            effectID: 'reverb1',
            param: 'Liveness',
            axis: 'x'
        }
        expect(emitReducer(undefined, {
            type: 'xyzMap',
            data
        })).toEqual(Map({
            xyzMap: data
        }));
    });
});