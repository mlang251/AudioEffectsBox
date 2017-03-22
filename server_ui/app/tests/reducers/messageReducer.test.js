import {UPDATE_MESSAGE} from '../../actions/actionTypes';
import messageReducer from '../../reducers/message';

describe('message reducer', () => {
    test('should return initial state', () => {
        expect(messageReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual('');
    });
    test('should handle UPDATE_MESSAGE', () => {
        expect(messageReducer('', {
            type: UPDATE_MESSAGE,
            payload: {
                message: 'Hello World'
            }
        })).toEqual('Hello World');
    });
});