import React from 'react';
import Radium from 'radium';
import effects from '../JSON/effects.json';
import ParameterContainer from './ParameterContainer';

const Effect = props => {
    const effect = effects.effects[props.type];
    const [parameterList, parameters] = [effect.parameterList, effect.parameters];
    let params = [];
    let xyzMapArray = [];
    props.xyzMap.forEach((axisInfo, axis) => {
        if (axisInfo.get('effectID') == props.ID) {
            xyzMapArray.push({
                param: axisInfo.get('param'),
                coord: axis
            });
        }
    });

    for (let i = 0; i < parameterList.length; i++) {
        const paramName = parameterList[i];
        const paramType = parameters[parameterList[i]];
        const axes = ['x', 'y', 'z'];
        let xyzMap = undefined;
        for (let i = 0; i < xyzMapArray.length; i++) {
            if (xyzMapArray[i].param == paramName) {
                xyzMap = xyzMapArray[i].coord;
            }
        }
        params.push(
            <div
                key = {i}
                style = {styles.paramDiv}>
                <div style = {styles.xyzMapDiv}>
                    <p style = {styles.xyzMap}>{xyzMap ? xyzMap : ' '}</p>
                </div>
                <p style = {styles.paramTitle}>{paramName}</p>
                <ParameterContainer
                    type = {paramType}
                    info = {{effectID: props.ID,  paramName: paramName}}
                    value = {props.parameterValues[paramName]}
                    onParameterChange = {props.onParameterChange}
                    isMapping = {props.isMapping}
                    mapToParameter = {props.mapToParameter} />
            </div>
        );
    }

    return (
        <div style = {styles.effectDiv}>
            <p style = {styles.effectTitle}>{effect.name}</p>
            {params}
            <button
                type = 'button'
                onClick = {() => props.handleCloseButtonClick(props.ID)}>X</button>
        </div>
    );
}

const styles = {
    effectDiv: {
        display: 'inline-block',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#333',
        boxShadow: 'inset 0 0 5px #AAA',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    xyzMapDiv: {
        display: 'inline-block',
        height: 30,
        width: '100%'
    },
    effectTitle: {
        textAlign: 'center'
    },
    paramTitle: {
        textAlign: 'center',
        fontSize: '0.8em'
    },
    xyzMap: {
        textAlign: 'center',
        padding: 0,
        margin: 0
    }
}

export default Radium(Effect);
