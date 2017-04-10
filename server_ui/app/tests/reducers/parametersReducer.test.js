import {Map} from 'immutable';
import {UPDATE_PARAMETER_VALUE, RECEIVE_LEAP_DATA, UPDATE_MAPPING, REMOVE_MAPPING} from '../../actions/actionTypes';
import parametersReducer, {createInitialState} from '../../reducers/parameters';
import defaults from '../../JSON/defaults.json';

describe('parameters reducer', () => {
    test('should return initial state', () => {
        const initialState = createInitialState();
        expect(parametersReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(initialState);
    });
    test('should handle UPDATE_PARAMETER_VALUE', () => {
        expect(parametersReducer(Map({
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        }), {
            type: UPDATE_PARAMETER_VALUE,
            payload: {
                effectID: 'reverb1',
                paramName: 'Liveness',
                paramValue: 0.321
            }
        })).toEqual(Map({
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0.321,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        }));
    });
    test('should handle RECEIVE_LEAP_DATA - no parameters mapped', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: [0.321, 0.654, 0.987]
            }
        })).toEqual(initialState);
    });
    test('should handle RECEIVE_LEAP_DATA - mapped to x', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: 'x'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        const expectedState = Map({
            mappings: Map({
                x: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0.321,
                        axisName: 'x'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: [0.321, 0.654, 0.987]
            }
        })).toEqual(expectedState);
    });
    test('should handle RECEIVE_LEAP_DATA - mapped to y', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: 'y'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        const expectedState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0.654,
                        axisName: 'y'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: [0.321, 0.654, 0.987]
            }
        })).toEqual(expectedState);
    });
    test('should handle RECEIVE_LEAP_DATA - mapped to z', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: 'z'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        const expectedState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0.987,
                        axisName: 'z'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: [0.321, 0.654, 0.987]
            }
        })).toEqual(expectedState);
    });
    test('should handle UPDATE_MAPPING - do not map to parameter', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: false,
                axis: 'x'
            }
        })).toEqual(initialState);
    });
    test('should handle UPDATE_MAPPING - map to parameter', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        const expectedState = Map({
            mappings: Map({
                x: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: 'x'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: true,
                axis: 'x',
                effectID: 'reverb1',
                paramName: 'Liveness'
            }
        })).toEqual(expectedState);
    });
    test('should handle REMOVE_MAPPING', () => {
        const initialState = Map({
            mappings: Map({
                x: Map({
                    effectID: 'reverb1',
                    paramName: 'Liveness'
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: 'x'
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        const expectedState = Map({
            mappings: Map({
                x: Map({
                    effectID: '',
                    paramName: ''
                }),
                y: Map({
                    effectID: '',
                    paramName: ''
                }),
                z: Map({
                    effectID: '',
                    paramName: ''
                })
            }),
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        });
        expect(parametersReducer(initialState, {
            type: REMOVE_MAPPING,
            payload: {
                axis: 'x',
                effectID: 'reverb1',
                paramName: 'Liveness'
            }
        })).toEqual(expectedState);
    });
});