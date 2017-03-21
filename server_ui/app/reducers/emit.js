import {Map} from 'immutable';

const emit = (state = Map(), action) => {
    switch(action.type){
        case 'route':
            return Map({route: action.data});
            break;
        case 'updateParam':
            return Map({updateParam: action.data});
            break;
        case 'xyzMap':
            return Map({xyzMap: action.data});
            break;
        default:
            return state;
    }
}

export default emit;