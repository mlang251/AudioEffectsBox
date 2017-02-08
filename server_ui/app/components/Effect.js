import React from 'react';
import Radium from 'radium';
import effects from '../JSON/effects.json';
import Parameter from './Parameter';

const Effect = props => {
    const effect = effects.effects[props.type];
    const [parameterList, parameters] = [effect.parameterList, effect.parameters];
    let params = [];
    for (let i = 0; i < parameterList.length; i++) {
        const name = parameterList[i];
        const type = parameters[parameterList[i]];
        params.push(
            <div
                key = {i}
                style = {styles.paramDiv}>
                <p style = {styles.paramTitle}>{name}</p>
                <Parameter
                    type = {type}
                    info = {{effectName: effect.name, paramName: name}}
                    value = {props.parameterValues[name]}
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
