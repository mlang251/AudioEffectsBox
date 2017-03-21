import {UPDATE_MESSAGE} from '../actions/actions';

const message = (state = '', action) => {
    const {message} = action.payload;
    switch (action.type) {
        case UPDATE_MESSAGE:
            return message;
            break;
        default:
            return state;
            break;
    }
};

export default message;

