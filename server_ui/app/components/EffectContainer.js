import React from 'react';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';
import Effect from './Effect';
import ParameterContainer from './ParameterContainer';

/**
 * The EffectContainer module. Responsible for creating parameters, buttons, and styles for it's Effect child. Appears
 *     as a child component of SignalChain, child component is Effect.
 * @module EffectContainer
 * @see module:SignalChain
 * @see module:Effect
 * @see module:ParameterContainer
 */

/** 
 * Class responsible for creating parameters, buttons, and styles for it's Effect child
 * @extends external:ReactPureComponent 
 */
class EffectContainer extends React.PureComponent {
    /** Create the EffectContainer instance */
    constructor(props) {
        super();
        /** @member {EffectTypeDescription} effect */
        this.effect = Immutable.fromJS(effects).getIn(['effects', props.type]);
    }

    /**
     * Creates an iterable of ParameterContainer components based on information from {@link module:EffectContainer~effect}.
     *     When creating ParameterContainer components, it determines whether or not the current effect has any parameter 
     *     mappings by comparing this unique effect ID with the effect IDs in props.xyzMap. If any mappings for parameters in
     *     this effect are found, it adds the info to xyzMapArray in the form of an object literal containing which parameter,
     *     and which axis should be mapped. It then iterates through the parameter list for this effect, and if a parameter has
     *     a mapping applied to it, it will create a div with the coordinate axis, as well as a button to remove the mapping. It
     *     then pushes a div with the parameter information and ParameterContainer component to the returned iterable.
     * @param {EffectTypeDescription} effect 
     * @returns {external:List} An Immutable List of html containing the ParameterContainer components and other info
     */
    createParameters(effect) {
        const [parameterList, parameters] = [this.effect.get('parameterList'), this.effect.get('parameters')];
        let params = Immutable.List().asMutable();
        let xyzMapArray = [];
        this.props.xyzMap.forEach((axisInfo, axis) => {
            if (axisInfo.get('effectID') == this.props.ID) {
                xyzMapArray.push({
                    param: axisInfo.get('param'),
                    coord: axis
                });
            }
        });

        parameterList.forEach((paramName, index) => {
            const paramType = parameters.get(paramName);
            const axes = ['x', 'y', 'z'];
            let xyzMap = undefined;
            for (let i = 0; i < xyzMapArray.length; i++) {
                if (xyzMapArray[i].param == paramName) {
                    const thisAxis = xyzMapArray[i].coord;
                    xyzMap = [
                        <p 
                            key = {`${this.props.ID}${thisAxis}`}
                            style = {styles.xyzMap}>{thisAxis}</p>,
                        <button 
                            key = {`${this.props.ID}Remove${thisAxis}`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.removeMappingButton)}
                            onClick = {() => this.props.handleRemoveMappingClick(thisAxis, this.props.ID, paramName)}>X</button>
                    ];
                }
            }
            params = params.push(
                <div
                    key = {index}
                    style = {styles.paramDiv}>
                    <div style = {styles.xyzMapDiv}>
                        {xyzMap}
                    </div>
                    <p style = {styles.paramTitle}>{paramName}</p>
                    <ParameterContainer
                        type = {paramType}
                        info = {Immutable.Map({effectID: this.props.ID,  paramName: paramName})}
                        value = {this.props.parameterValues.get(paramName)}
                        onParameterChange = {this.props.onParameterChange}
                        isMapping = {this.props.isMapping}
                        mapToParameter = {this.props.mapToParameter} />
                </div>
            );
        });
        return params.asImmutable();
    }

    /**
     * Creates an Immutable Map containing the effect reordering buttons. If there are multiple effects in the signal chain,
     *     the props.reorderButtonLeft and props.reorderButtonRight values will be true or false, depending on whether or not
     *     an effect can be moved in the corresponding direction (e.g. the first effect in the chain cannot be moved to the left
     *     but it can be moved to the right. An effect in the middle of two other effects can be moved in both directions). 
     * @param {string} direction - Indicates the direction of the reordering button to create
     * @returns {external:List} An Immutable List containing html for the reordering button with the specified direction
     */
    createReorderButtons(direction) {
        if (direction == 'left') {
            return Immutable.List([(
                <button
                    type = 'button'
                    key = {`${this.props.ID}Left`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonLeft)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'left')}>&lt;</button>
            )]);
        } else if (direction == 'right') {
           return Immutable.List([(
                <button
                    type = 'button'
                    key = {`${this.props.ID}Right`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonRight)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'right')}>&gt;</button>
            )]);
        } else {
            return null;
        }
    }

    /**
     * Renders the child Effect component and passes along the generated HTML and ParameterContainer components
     * @see module:Effect
     */
    render() {
        return (
            <Effect
                params = {this.createParameters(this.effect)}
                isGainBlock = {this.props.type == 'gain'}
                reorderButtonLeft = {this.props.reorderButtonLeft ? this.createReorderButtons('left') : null}
                reorderButtonRight = {this.props.reorderButtonRight ? this.createReorderButtons('right') : null}
                bypassStyle = {this.props.isBypassed ? 'isActive' : 'isNotActive'}
                soloStyle = {this.props.isSoloing ? 'isActive' : 'isNotActive'}
                effectName = {this.effect.get('name')}
                ID = {this.props.ID}
                handleSoloButtonClick = {this.props.handleSoloButtonClick}
                handleBypassButtonClick = {this.props.handleBypassButtonClick}
                handleCloseButtonClick = {this.props.handleCloseButtonClick} />
        );
    }
}

/**
 * A style object whose members are passed to components when rendering.
 * @type {Object}
 */
const styles = {
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    xyzMapDiv: {
        height: 30,
        width: '100%'
    },
    paramTitle: {
        textAlign: 'center',
        fontSize: '0.8em'
    },
    xyzMap: {
        display: 'inline-block',
        padding: 0,
        margin: 0
    },
    buttonBase: {
        display: 'inline-block',
        borderRadius: '50%',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1.5,
        borderColor: '#333',
        borderStyle: 'solid',
        ':focus': {
            outline: 'none'
        }
    },
    reorderButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    reorderButtonLeft: {
        left: 3
    },
    reorderButtonRight: {
        right: 3
    }
}

/** The EffectContainer component */
export default EffectContainer;
