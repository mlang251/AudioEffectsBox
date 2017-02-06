import React from 'react';
import Radium from 'radium';
import effects from '../JSON/effects.json';
import Parameter from './Parameter';

const renderParams = effectObject => {
    const [parameterList, parameters] = [effectObject.parameterList, effectObject.parameters];
    let parameterArray = [];
    for (let i = 0; i < parameterList.length; i++) {
        const name = parameterList[i];
        const type = parameters[parameterList[i]];
        parameterArray.push(
            <div>
                <p>{name}</p>
                <Parameter type = {type} />
            </div>
        );
    }
    return parameterArray;
}

const Effect = props => {
    const effect = JSON.parse(effects[props.type]);
    const params = renderParams(effect);
    return (
        <div>
            <p>{effect.name}</p>
            {params}
        </div>
    );
}

export default Radium(Effect);
