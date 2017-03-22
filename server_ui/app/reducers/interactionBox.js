import {Map, List} from 'immutable';
import {RECEIVE_LEAP_DATA, RECEIVE_LEAP_STATUS} from '../actions/actionTypes';

const initialState = Map({
    coords: List(),
    dimensions: Map({
        Height: undefined,
        Width: undefined,
        Depth: undefined
    }),
    isConnected: false,
    isInBounds: false,
    isTracking: false
});

const interactionBox = (state = initialState, action) => {
    const {data, address, args} = action.payload;
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            return state.update('coords', value => List(data))
        case RECEIVE_LEAP_STATUS:
            switch (address) {
                case '/BoxDimensions':
                    const dimensions = JSON.parse(args);
                    return state.update('isConnected', value => true)
                            .update('dimensions', value => state.get('dimensions').merge(Map(dimensions)))
                case '/BoundStatus':
                    return state.update('isInBounds', value => args[0] ? true : false)
                case '/TrackingMode':
                    return state.update('isTracking', value => args[0] ? true : false)
                default:
                    return;
            }
        default:
            return state;
    }
}

export default interactionBox;