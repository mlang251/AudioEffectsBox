import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

const SignalChain = props => {
    const effects = props.children.map((effect, index) => {
        const {ID, type} = effect.toJS();
        return (
            <Effect
                key = {ID}
                ID = {ID}
                type = {type}
                parameterValues = {props.parameterValues.get(ID)}
                onParameterChange = {props.onParameterChange}
                isMapping = {props.isMapping}
                mapToParameter = {props.mapToParameter}
                xyzMap = {props.xyzMap}
                handleCloseButtonClick = {props.removeEffect} />
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
