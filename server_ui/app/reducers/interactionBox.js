import {Map, List} from 'immutable';
const {UPDATE_COORDS, RECEIVE_LEAP_STATUS} = require('../actions/actionTypes');

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
    switch (action.type) {
        case UPDATE_COORDS:
            var {data} = action.payload;
            return state.update('coords', value => List(data))
        case RECEIVE_LEAP_STATUS:
            var {address, args} = action.payload;
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