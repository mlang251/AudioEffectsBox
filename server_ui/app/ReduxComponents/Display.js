import React from 'react';
import InteractionBoxContainer from './InteractionBoxContainer';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';

/**
 * The Display module. Responsible for conditionally rendering whatever is passed as props.children. Appears as child
 *     component of InteractionBoxContainer, child components are InteractionBoxPlaceholder and InteractionBox.
 * @module Display
 * @see module:InteractionBoxContainer
 * @see module:InteractionBoxPlaceholder
 * @see module:InteractionBox
 */

const mapStateToProps = (state) => {
    return {
        isConnected: state.interactionBox.get('isConnected')
    };
};

/** 
 * Class responsible for conditionally rendering whatever is passed as props.children
 * @extends external:ReactPureComponent 
 */
let Display = ({isConnected}) => {
    return isConnected ? <InteractionBoxContainer /> : <InteractionBoxPlaceholder />;
}

Display = connect(
    mapStateToProps
)(Display);

/** The Display component */
export default Display;