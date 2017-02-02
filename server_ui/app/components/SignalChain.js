import React from 'react';
import Radium from 'radium';

const generateEffects = effectsArray => {
    return effectsArray.map((effect, i) => {
        return (
            <div className = 'effect'
                 key = {i}
                 style = {styles.divEffects}>
                {effect.type}
            </div>
        );
    });
}

const SignalChain = props => {
    const effects = generateEffects(props.children);
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
    },
    divEffects: {
        display: 'inline-block',
        height: 100,
        width: 100,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F00'
    }
}
