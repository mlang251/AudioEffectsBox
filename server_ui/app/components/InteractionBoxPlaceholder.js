import React from 'react';
import Radium from 'radium';

/**
 * The InteractionBoxPlaceholder module. Renders a placeholder for the InteractionBox component when the Leap is not yet
 *     plugged into the computer. Appears as a child component of the App component.
 */
const InteractionBoxPlaceholder = () => (
    <section style = {styles.container}>
        <h4 style = {styles.text}>Leap Motion Controller not detected</h4>
    </section>
);

const styles = {
    container: {
        width: '40vh',
        height: '40vh',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '3vh',
        paddingRight: '3vh',
        paddingBottom: '3vh',
        paddingLeft: '3vh',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
    }
}

export default Radium(InteractionBoxPlaceholder);
