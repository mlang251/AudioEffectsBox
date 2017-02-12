import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

const generateEffects = effectsArray => {
    return effectsArray.map((effect, i) => {
        return (
            <Effect type = {effect.type}
                    key = {i} />
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
    }
}
