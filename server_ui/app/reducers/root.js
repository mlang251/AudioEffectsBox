import {combineReducers} from 'redux-immutable';
import effects from './effects';
import interactionBox from './interactionBox';
import mapping from './mapping';
import message from './message';
import parameterValues from './parameterValues';
import xyzMap from './xyzMap';

const root = combineReducers({
    effects,
    interactionBox,
    mapping,
    message,
    parameterValues,
    xyzMap
});

export default root;