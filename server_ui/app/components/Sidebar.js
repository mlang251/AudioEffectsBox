import React from 'react';
import Radium from 'radium';

class Sidebar extends React.PureComponent {
    constructor() {
        super();
    }

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

export default Radium(Sidebar);
