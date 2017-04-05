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
    interactionBox: Immutable.Map({
        coords: Immutable.List([0.456, 0.764, 0.897]),
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