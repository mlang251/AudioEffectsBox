import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

const SignalChain = props => {
    const effectsArray = props.children;
    const effects = effectsArray.map((effect, i) => {
        return (
            <Effect
                key = {effect.ID}
                ID = {effect.ID}
                type = {effect.type}
                parameterValues = {props.parameterValues[effect.ID]}
                onParameterChange = {props.onParameterChange}
                isMapping = {props.isMapping}
                mapToParameter = {props.mapToParameter} />
        );
    });
    return (
        <div id = 'signalChain' style = {styles.div}>
            {effects}
        </div>
    )
};

export default Radium(SignalChain);

const styles = {
    div: {
        display: 'inline-block',
        height: 400,
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    }
}
