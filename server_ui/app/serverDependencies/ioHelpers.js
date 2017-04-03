const List = require('immutable').List;

//
//Socket.io helper functions and variables
//
const createRoutes = (effectsList = List()) => {
    //TODO: for some reason the immutable effectsList is being converted into plain JS
    let routeObj = {input: 'output'};
    const soloEffect = effectsList.filter(effect => {
        return effect.isSoloing;
    });
    const effectsToRoute = soloEffect.length > 0 ? soloEffect : effectsList;
    let isFirstInChain = true;
    effectsToRoute.forEach((effect, index) => {
        if (!effect.isBypassed) {
            const effectID = effect.effectID;
            if (isFirstInChain) {
                routeObj.input = effectID;
                isFirstInChain = false;
            }
            routeObj[effectID] = effectsToRoute[index + 1] ? effectsToRoute[index + 1].effectID : 'output';
        }
    });
    return routeObj;
}

const updateMapping = (method, effectID, paramName, axis) => {
    let data = {
        effectID,
        param: paramName,
        axis: ''
    };
    switch (method) {
        case 'remove':
            data.axis = 'n';
            break;
        case 'set':
            data.axis = axis;
            break;
        default:
            console.log('Unknown mapping method');
            break;
    }
    return data;
};

const updateParameter = (effectID, paramName, paramValue) => {
    return {
        effectID,
        paramName,
        paramValue
    };
}

module.exports = {
    createRoutes,
    updateMapping,
    updateParameter
}