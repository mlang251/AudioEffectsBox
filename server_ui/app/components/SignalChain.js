import React from 'react';
import Radium from 'radium';

class SignalChain extends React.Component {
    render() {
        return <div style = {styles.div}></div>
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
