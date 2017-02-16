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
            let xyzMap = undefined;
            for (let i = 0; i < xyzMapArray.length; i++) {
                if (xyzMapArray[i].param == paramName) {
                    xyzMap = xyzMapArray[i].coord;
                }
            }
            params.push(
                <div
                    key = {index}
                    style = {styles.paramDiv}>
                    <div style = {styles.xyzMapDiv}>
                        <p style = {styles.xyzMap}>{xyzMap ? xyzMap : ' '}</p>
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

        return (
            <div style = {styles.effectDiv}>
                <p style = {styles.effectTitle}>{effect.get('name')}</p>
                {params}
                <button
                    type = 'button'
                    onClick = {() => this.props.handleBypassButtonClick(this.props.ID)}>Bypass</button>
                <button
                    type = 'button'
                    onClick = {() => this.props.handleCloseButtonClick(this.props.ID)}>X</button>
            </div>
        );
    }
}

const styles = {
    effectDiv: {
        display: 'inline-block',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#333',
        boxShadow: 'inset 0 0 5px #AAA',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    xyzMapDiv: {
        display: 'inline-block',
        height: 30,
        width: '100%'
    },
    effectTitle: {
        textAlign: 'center'
    },
    paramTitle: {
        textAlign: 'center',
        fontSize: '0.8em'
    },
    xyzMap: {
        textAlign: 'center',
        padding: 0,
        margin: 0
    }
}

export default Radium(Effect);
