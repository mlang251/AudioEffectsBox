import React from 'react';
import Radium from 'radium';
import effects from '../JSON/effects.json';
import Parameter from './Parameter';

const Effect = props => {
    const effect = effects.effects[props.type];
    const [parameterList, parameters] = [effect.parameterList, effect.parameters];
    let params = [];
    for (let i = 0; i < parameterList.length; i++) {
        const paramName = parameterList[i];
        const paramType = parameters[parameterList[i]];
        params.push(
            <div
                key = {i}
                style = {styles.paramDiv}>
                <p style = {styles.paramTitle}>{paramName}</p>
                <Parameter
                    type = {paramType}
                    info = {{effectID: props.ID,  paramName: paramName}}
                    value = {props.parameterValues[paramName]}
                    onParameterChange = {props.onParameterChange} />
            </div>
        );
    }
    return (
        <div style = {styles.effectDiv}>
            <p style = {styles.effectTitle}>{effect.name}</p>
            {params}
        </div>
    );
}

const styles = {
    effectDiv: {
        display: 'inline-block',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F00'
    },
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    effectTitle: {
        textAlign: 'center'
    },
    paramTitle: {
        textAlign: 'center',
        fontSize: '0.8em'
    }
}

export default Radium(Effect);
