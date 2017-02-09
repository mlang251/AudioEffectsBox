import React from 'react';
import Radium from 'radium';
import effects from '../JSON/effects.json';

const Sidebar = props => {
    const effectsList = effects.list;
    let buttonArray = [];
    effectsList.forEach(effectName => {
        buttonArray.push(
            <button
                type = 'button'
                key = {effectName}
                style = {styles.button}
                onClick = {() => props.handleClick(effectName.toLowerCase())}>Add {effectName}</button>
        );
    });
    return (
        <div>
            <h3>Effects</h3>
            {buttonArray}
        </div>
    );
}

const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

export default Radium(Sidebar);
