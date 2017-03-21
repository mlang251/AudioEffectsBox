import {combineReducers} from 'redux';
import effects from './effects';
import emit from './emit';
import interactionBox from './interactionBox';
import mapping from './mapping';
import message from './message';
import parameterValues from './parameterValues';
import xyzMap from './xyzMap';

const app = combineReducers({
    effects,
    emit,
    interactionBox,
    mapping,
    message,
    parameterValues,
    xyzMap
});

export default app;