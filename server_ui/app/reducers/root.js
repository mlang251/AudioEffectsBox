import {combineReducers} from 'redux-immutable';
import effects from './effects';
import interactionBox from './interactionBox';
import mapping from './mapping';
import message from './message';
import parameters from './parameters';

const root = combineReducers({
    effects,
    interactionBox,
    mapping,
    message,
    parameters
});

export default root;