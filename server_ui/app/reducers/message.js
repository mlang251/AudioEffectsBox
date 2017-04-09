import {UPDATE_MESSAGE} from '../actions/actionTypes';

/**
 * Updates the message to be displayed.
 * @param {String} state - The message to be displayed
 * @param {Object} action - The action that is calling the reducer
 */
const message = (state = '', action) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            var {message} = action.payload;
            return message;
        default:
            return state;
    }
};

export default message;

