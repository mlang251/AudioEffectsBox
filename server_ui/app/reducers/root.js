import {combineReducers} from 'redux-immutable';
import effects from './effects';
import interactionBox from './interactionBox';
import mapping from './mapping';
import message from './message';
import parameterValues from './parameterValues';

const root = combineReducers({
    effects,
    interactionBox,
    mapping,
    message,
    parameterValues
});

export default root;