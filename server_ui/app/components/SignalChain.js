import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

class SignalChain extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const effects = this.props.children.map((effect, index) => {
            const {ID, type, isBypassed, isSoloing} = effect.toJS();
            return (
                <Effect
                    key = {ID}
                    ID = {ID}
                    type = {type}
                    isBypassed = {isBypassed}
                    isSoloing = {isSoloing}
                    parameterValues = {this.props.parameterValues.get(ID)}
                    onParameterChange = {this.props.onParameterChange}
                    isMapping = {this.props.isMapping}
                    mapToParameter = {this.props.mapToParameter}
                    xyzMap = {this.props.xyzMap}
                    handleCloseButtonClick = {this.props.removeEffect} 
                    handleBypassButtonClick = {this.props.toggleBypass} 
                    handleSoloButtonClick = {this.props.toggleSolo} 
                    handleRemoveMappingClick = {this.props.removeMapping}
                    reorderButtonLeft = {index != 0}
                    reorderButtonRight = {index != this.props.children.size - 1} 
                    handleReorderButtonClick = {this.props.reorderEffects} />
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
        height: '100%',
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    }
}
