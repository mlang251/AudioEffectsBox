import {Map, List} from 'immutable';
import {RECEIVE_LEAP_DATA, RECEIVE_LEAP_STATUS} from '../../actions/actionTypes';
import interactionBoxReducer from '../../reducers/interactionBox';

describe('interactionBox reducer', () => {
    test('should return initial state', () => {
        expect(interactionBoxReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(Map({
            coords: List(),
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
    test('should handle RECEIVE_LEAP_DATA', () => {
        expect(interactionBoxReducer(Map({
            coords: List([0.789, 0.456, 0.123]),
            dimensions: Map({
                Height: undefined,
                Width: undefined,
                Depth: undefined
            }),
            isConnected: false,
            isInBounds: false,
            isTracking: false
        }), {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: [0.284, 0.321, 0.987]
            }
        })).toEqual(Map({
            coords: List([0.284, 0.321, 0.987]),
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
            coords: List(),
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
            coords: List(),
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
            coords: List(),
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
            coords: List(),
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
            coords: List(),
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
            coords: List(),
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

