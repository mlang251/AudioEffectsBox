import React from 'react';
import Immutable from 'immutable';
import Parameter from './Parameter';

/**
 * The ParameterContainer module. Responsible for rendering the parameter, maintaining it's value, and facilitating
 *     interaction with the parameter. Appears as child component of Effect, child components are Parameter.
 * @module ParameterContainer
 * @see module:ParameterContainer
 * @see module:Parameter
 */

/** 
 * Class responsible for rendering the parameter, maintaining it's value, and facilitating interaction with the parameter.
 * @extends external:ReactPureComponent 
 */
class ParameterContainer extends React.PureComponent {
    /** Creates the ParameterContainer instance. Binds methods to this instance. */
    constructor() {
        super();
        this.handleMappingClick = this.handleMappingClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    /**
     * Retrives the parameter's value and calls this.props.onParameterChange, which is used to update the app state 
     *     of the parameters, and emit the initial value of the Parameter.
     */
    componentWillMount() {
        const info = this.props.info.set('paramValue', this.props.value);
        this.props.onParameterChange(Immutable.List([info]));
    }

    /**
     * Handles the user interaction of dragging a fader. The value must be between 0 and 1, so it normalizes the yValue
     *     on this range, rounds it to three decimal places, and calls this.props.onParameterChange to update the
     *     app state of the parameter, and emit the value of the Parameter.
     * @param {Number} yValue - The Y value the fader was dragged to
     * @param {Number} max - Equal to the height of the fader's containing element
     */
    handleDrag(yValue, max) {
        let value =                                 //Make sure the value is within the bounds of the draggable area
            yValue < 0 ? 0                          //Normalize it on a scale of 0-1
            : yValue > max ? 1
            : yValue/max
        value = Math.round(value * 1000)/1000;
        const updatedInfo = this.props.info.set('paramValue', value);
        this.props.onParameterChange(Immutable.List([updatedInfo]));
    }

    /**
     * Handles the user interaction of clicking on a Parameter. If the app is currently in mapping mode, clicking on a
     *     parameter will call props.mapToParameter, which will map the current axis being mapped to the Parameter that
     *     was clicked.
     */
    handleMappingClick() {
        if (!this.props.isMapping) {
            return false;
        } else {
            this.props.mapToParameter(this.props.info);
        }
    }

    /**
     * Renders a Parameter component.
     * @see module:Parameter
     */
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

/** The ParameterContainer component */
export default ParameterContainer;
