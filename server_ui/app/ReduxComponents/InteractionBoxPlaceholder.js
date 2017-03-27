import React from 'react';
import Radium from 'radium';

/**
 * The InteractionBoxPlaceholder module. Responsible rendering the InteractionBoxPlaceholder. Appears as a child component
 *     of the InteractionBoxContainer component.
 * @module InteractionBoxPlaceholder
 * @see module:InteractionBoxContainer
 */

/** 
 * Class responsible rendering the InteractionBoxPlaceholder.
 * @extends external:ReactPureComponent 
 */
const InteractionBoxPlaceholder = () => (
    <section style = {styles.container}>
        <h4 style = {styles.text}>Leap Motion Controller not detected</h4>
    </section>
);

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
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

/** The InteractionBoxPlaceholder component */
export default Radium(InteractionBoxPlaceholder);
