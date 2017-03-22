import * as types from '../actions/actionTypes';
import * as actions from '../actions/actionCreators';

describe('actions', () => {
    test('should create an action to update the message', () => {
        const message = 'Hello World';
        const expectedAction = {
            type: types.UPDATE_MESSAGE,
            payload: {
                message
            }
        };
        expect(actions.updateMessage(message)).toEqual(expectedAction);
    });
});