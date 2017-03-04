import React from 'react';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';
import Effect from './Effect';
import ParameterContainer from './ParameterContainer';

class EffectContainer extends React.PureComponent {
    constructor() {
        super();
    }

    componentWillMount() {
        this.effect = Immutable.fromJS(effects).getIn(['effects', this.props.type]);
    }

    createParameters(effect) {
        const [parameterList, parameters] = [this.effect.get('parameterList'), this.effect.get('parameters')];
        let params = Immutable.List([]).asMutable();
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
            let mapToAxis = undefined;
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

    createReorderButtons() {
        let buttons = Immutable.Map().asMutable();
        if (this.props.reorderButtonLeft) {
            buttons = buttons.set('reorderButtonLeft', value => (
                <button
                    type = 'button'
                    key = {`${this.props.ID}Left`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonLeft)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'left')}>&lt;</button>
            ));
        }
        if (this.props.reorderButtonRight) {
            buttons = buttons.set('reorderButtonRight', value => (
                <button
                    type = 'button'
                    key = {`${this.props.ID}Right`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonRight)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'right')}>&gt;</button>
            ));
        }
        return buttons.asImmutable();
    }

    createStyles() {
        return {
            bypassStyle: this.props.isBypassed ? 'isActive' : 'isNotActive',
            soloStyle: this.props.isSoloing ? 'isActive' : 'isNotActive'
        }
    }

    render() {
        const params = this.createParameters(this.effect);
        const {reorderButtonLeft, reorderButtonRight} = this.createReorderButtons().toJS();
        const {bypassStyle, soloStyle} = this.createStyles();
        return (
            <Effect
                params = {params}
                reorderButtonLeft = {reorderButtonLeft}
                reorderButtonRight = {reorderButtonRight}
                bypassStyle = {bypassStyle}
                soloStyle = {soloStyle}
                effectName = {this.effect.get('name')}
                ID = {this.props.ID}
                handleSoloButtonClick = {this.props.handleSoloButtonClick}
                handleBypassButtonClick = {this.props.handleBypassButtonClick}
                handleCloseButtonClick = {this.props.handleCloseButtonClick} />
        );
    }
}

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

export default EffectContainer;
