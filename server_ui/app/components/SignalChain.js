import React from 'react';
import Radium from 'radium';

class SignalChain extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        console.log(this.props.effects);
        return (
            <div id = 'signalChain' style = {styles.div}>
                {this.props.effects}
            </div>
        )
    }
}

export default Radium(SignalChain);

const styles = {
    div: {
        height: '100%',
        width: '100%',
        marginBottom: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    }
}
