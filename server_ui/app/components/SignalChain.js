import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

class SignalChain extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const effects = this.props.children.map((effect, index) => {
            const {ID, type, isBypassed} = effect.toJS();
            return (
                <Effect
                    key = {ID}
                    ID = {ID}
                    type = {type}
                    isBypassed = {isBypassed}
                    parameterValues = {this.props.parameterValues.get(ID)}
                    onParameterChange = {this.props.onParameterChange}
                    isMapping = {this.props.isMapping}
                    mapToParameter = {this.props.mapToParameter}
                    xyzMap = {this.props.xyzMap}
                    handleCloseButtonClick = {this.props.removeEffect} 
                    handleBypassButtonClick = {this.props.toggleBypass} />
            );
        });
        return (
            <div id = 'signalChain' style = {styles.div}>
                {effects}
            </div>
        )
    }
}

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
