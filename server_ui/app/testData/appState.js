state = {
    message: '',
    effects: Immutable.List([
        Immutable.Map({
            effectType: 'reverb',
            effectID: 'reverb1',
            isBypassed: false,
            isSoloing: false
        })
    ]),
    parameters: Immutable.Map({
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
            }),
        }),
        reverb1: Map({
            Liveness: Map ({
                paramValue: 0,
                axisName: 'x'
            })
        })
    }),
    mapping: Immutable.Map({
        isMapping: false,
        currentAxis: ''
    }),
    coords: Immutable.List([0.456, 0.764, 0.897]),
    interactionBox: Immutable.Map({
        dimensions: Immutable.Map({
            Height: 20,
            Width: 20,
            Depth: 20
        }),
        isConnected: false,
        isInBounds: false,
        isTracking: false
    })
}