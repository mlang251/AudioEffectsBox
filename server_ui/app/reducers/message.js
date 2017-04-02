import {UPDATE_MESSAGE} from '../../actions/actionTypes';

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

