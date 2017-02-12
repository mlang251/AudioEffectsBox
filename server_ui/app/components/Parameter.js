import React from 'react';
import Radium from 'radium';

const Parameter = props => {
    return (
        <div style = {styles.div}>{props.type}</div>
    );
}

const styles = {
    div: {
        height: 100,
        width: 50,
        display: 'inline-block'
    }
}

export default Radium(Parameter);
