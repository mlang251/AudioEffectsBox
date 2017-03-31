import reduceReducers from 'reduce-reducers';
import stateRoot from './stateReducers/stateRoot';
import socketRoot from './socketReducers/socketRoot';

const root = reduceReducers(stateRoot, socketRoot);

export default root;