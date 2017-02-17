import React from 'react';
import Radium from 'radium';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';
import ParameterContainer from './ParameterContainer';

class Effect extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const effect = Immutable.fromJS(effects).getIn(['effects', this.props.type]);
        const [parameterList, parameters] = [effect.get('parameterList'), effect.get('parameters')];
        let params = [];
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
            params.push(
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

        let reorderButtonLeft;
        let reorderButtonRight;
        if (this.props.reorderButtonLeft) {
            reorderButtonLeft = (
                <button
                    type = 'button'
                    key = {`${this.props.ID}Left`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonLeft)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'left')}>&lt;</button>
            );
        }
        if (this.props.reorderButtonRight) {
            reorderButtonRight = (
                <button
                    type = 'button'
                    key = {`${this.props.ID}Right`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonRight)}
                    onClick = {() => this.props.handleReorderButtonClick(this.props.ID, 'right')}>&gt;</button>
            );
        }
        
        const bypassStyle = this.props.isBypassed ? 'isActive' : 'isNotActive';
        const soloStyle = this.props.isSoloing ? 'isActive' : 'isNotActive';
        return (
            <div style = {styles.effectDiv}>
                <div style = {styles.headerDiv}>
                    <p style = {styles.effectTitle}>{effect.get('name')}</p>
                    <div style = {styles.buttonDiv}>
                        <button
                            key = {`${this.props.ID}Solo`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.soloButton, styles[soloStyle])}
                            onClick = {() => this.props.handleSoloButtonClick(this.props.ID)}>S</button>
                        <button
                            key = {`${this.props.ID}Bypass`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.bypassButton, styles[bypassStyle])}
                            onClick = {() => this.props.handleBypassButtonClick(this.props.ID)}>B</button>
                        <button
                            key = {`${this.props.ID}Close`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.closeButton)}
                            onClick = {() => this.props.handleCloseButtonClick(this.props.ID)}>X</button>
                    </div>
                </div>
                {reorderButtonLeft}
                {params}
                {reorderButtonRight}
            </div>
        );
    }
}

const styles = {
    effectDiv: {
        display: 'inline-block',
        position: 'relative',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#333',
        boxShadow: 'inset 0 0 5px #AAA',
        borderRadius: 5,
        paddingLeft: 40,
        paddingRight: 40,
    },
    headerDiv: {
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonDiv: {
        display: 'inline-block'
    },
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    xyzMapDiv: {
        height: 30,
        width: '100%'
    },
    effectTitle: {
        display: 'inline-block'
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
    soloButton: {

    },
    bypassButton: {

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
    },
    removeMappingButton: {
        display: 'inline-block'
    },
    closeButton: {
        backgroundColor: '#999'
    },
    isActive: {
        backgroundColor: 'yellow'
    },
    isNotActive: {
        backgroundColor: '#999'
    }
}

export default Radium(Effect);
