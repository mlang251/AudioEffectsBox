import React from 'react';
import Radium from 'radium';
import Parameter from './Parameter';

class ParameterContainer extends React.Component {
    constructor() {
        super();
        this.handleMappingClick = this.handleMappingClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDrag(data, info, max) {
        let value =                                 //Make sure the value is within the bounds of the draggable area
            data.y < 0 ? 0                          //Normalize it on a scale of 0-1
            : data.y > max ? 1
            : data.y/max
        value = Math.round(value * 1000)/1000;
        const updatedInfo = info.set('paramValue', value);
        this.props.onParameterChange(updatedInfo);
    }

    handleMappingClick(isMapping, info) {
        if (!isMapping) {
            return false;
        } else {
            this.props.mapToParameter(info);
        }
    }

    render() {
        return (
            <Parameter
                handleMappingClick = {this.handleMappingClick}
                isMapping = {this.props.isMapping}
                value = {this.props.value}
                handleDrag = {this.handleDrag}
                info = {this.props.info} />
        );
    }
}

export default Radium(ParameterContainer);
