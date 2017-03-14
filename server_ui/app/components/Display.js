import React from 'react';

/**
 * The Display module. Responsible for conditionally rendering whatever is passed as props.children. Appears as child
 *     component of InteractionBoxContainer, child components are InteractionBoxPlaceholder and InteractionBox.
 * @module Display
 * @see module:InteractionBoxContainer
 * @see module:InteractionBoxPlaceholder
 * @see module:InteractionBox
 */

/** 
 * Class responsible for conditionally rendering whatever is passed as props.children
 * @extends external:PureComponent 
 */
class Display extends React.PureComponent {
    /** Create the conditional Display component */
    constructor() {
        super();
    }
    
    /**
     * Renders whatever is passed as this props.children if props.if is true, otherwise does not render anything.
     * @see module:InteractionBox
     * @see module:InteractionBoxContainer
     * @see module:InteractionBoxPlaceholder
     */
    render() {
        return this.props.if ? <div>{this.props.children}</div> : null;
    }
}

/** The Display component */
export default Display;