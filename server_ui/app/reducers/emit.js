import {Map} from 'immutable';

const emit = (state = Map(), action) => {
    switch(action.type){
        case 'route':
        case 'updateParam':
        case 'xyzMap':
            return Map(action.data);
            break;
        default:
            return state;
    }
}

export default emit;