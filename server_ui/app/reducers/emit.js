import {Map} from 'immutable';

const emit = (state = Map(), action) => {
    switch(action.type){
        case 'route':
            return Map({route: action.data});
        case 'updateParam':
            return Map({updateParam: action.data});
        case 'xyzMap':
            return Map({xyzMap: action.data});
        default:
            return state;
    }
}

export default emit;