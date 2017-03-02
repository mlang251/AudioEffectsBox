import React from 'react';

class Display extends React.PureComponent {
    constructor() {
        super();
    }
    
    render() {
        return this.props.if ? <div>{this.props.children}</div> : null;
    }
}

export default Display;