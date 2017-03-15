import React from 'react';
import Radium from 'radium';

/**
 * The Sidebar module. Responsible rendering a Sidebar component which is used for adding effects to the signal
 *     chain and for entering mapping mode. Appears as a child component of the SidebarContainer component. 
 * @module Sidebar
 * @see module:SidebarContainer
 */

/** 
 * Class responsible rendering the Sidebar component.
 * @extends external:ReactPureComponent 
 */
class Sidebar extends React.PureComponent {
    /** Create the Sidebar component instance */
    constructor() {
        super();
    }

    /**
     * Renders HTML for the Sidebar component
     */
    render() {
        return (
            <div>
                <h3>Motion Tracking</h3>
                {this.props.axisButtons}
                <h3>Effects</h3>
                {this.props.effectsButtons}
            </div>
        );
    }
}

/** The Sidebar component */
export default Radium(Sidebar);
