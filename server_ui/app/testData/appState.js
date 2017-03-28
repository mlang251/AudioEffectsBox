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
    parameterValues: Immutable.fromJS(defaults.json),
    mapping: Immutable.Map({
        isMapping: false,
        currentAxis: ''
    }),
    xyzMap: Immutable.Map({
        x: Immutable.Map({
            effectID: undefined,
            paramName: undefined,
            axisName: 'x'
        }),
        y: Immutable.Map({
            effectID: undefined,
            paramName: undefined,
            axisName: 'y'
        }),
        z: Immutable.Map({
            effectID: undefined,
            paramName: undefined,
            axisName: 'z'
        })
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