import {Map} from 'immutable';
import {RECEIVE_LEAP_STATUS} from '../../actions/actionTypes';
import interactionBoxReducer from '../../reducers/interactionBox';

describe('interactionBox reducer', () => {
    test('should return initial state', () => {
        expect(interactionBoxReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: false
        }));
    });
    test('should handle RECEIVE_LEAP_STATUS - /BoxDimensions', () => {
        expect(interactionBoxReducer(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: false
        }), {
            type: RECEIVE_LEAP_STATUS,
            payload: {
                address: '/BoxDimensions',
                args: JSON.stringify({
                    Height: 30,
                    Width: 30,
                    Depth: 30
                })
            }
        })).toEqual(Map({
            dimensions: Map({
                Height: 30,
                Width: 30,
                Depth: 30
            }),
            isConnected: true,
            isInBounds: false,
            isTracking: false
        }));
    });
    test('should handle RECEIVE_LEAP_STATUS - /BoundStatus', () => {
        expect(interactionBoxReducer(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: false
        }), {
            type: RECEIVE_LEAP_STATUS,
            payload: {
                address: '/BoundStatus',
                args: [1]
            }
        })).toEqual(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: true,
            isTracking: false
        }));
    });
    test('should handle RECEIVE_LEAP_STATUS - /TrackingMode', () => {
        expect(interactionBoxReducer(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: false
        }), {
            type: RECEIVE_LEAP_STATUS,
            payload: {
                address: '/TrackingMode',
                args: [1]
            }
        })).toEqual(Map({
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: true
        }));
    });
});

