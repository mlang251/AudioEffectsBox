import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';
const {ROUTE, XYZ_MAP} = require('../actions/actionOptions').ioTypes;
const {ADD, REMOVE_EFF, SOLO, BYPASS, REORDER, REMOVE_MAP} = require('../actions/actionOptions').ioFlags;

const xyzMapToParameter = (xyzMap, effectID) => {
    let xyzMapList = List().asMutable();
    xyzMap.forEach(axis => {
        if (axis.get('effectID') == effectID) {
            xyzMapList = xyzMapList.push(Map({
                paramName: axis.get('paramName'),
                axisName: axis.get('axisName')
            }));
        }
    });
    return xyzMapList.asImmutable();
};

const determineSoloing = (effectsList) => {
    let allowBypass = true;
    effectsList.forEach(effect => {
        if (effect.get('isSoloing')) {
            allowBypass = false;
            return false;
        }
    });
    return allowBypass;
}

const mapStateToProps = (state, ownProps) => {
    return {
        xyzMapList: xyzMapToParameter(state.get('xyzMap'), ownProps.effectID),
        axisToMap: state.get('mapping').get('currentAxis'),
        allowBypass: determineSoloing(state.get('effects'))
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: () => {
            dispatch(removeEffect(ownProps.effectID, {
                io: true,
                ioType: ROUTE,
                ioFlag: REMOVE_EFF
            }));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffects(ownProps.effectID, direction, {
                io: true,
                ioType: ROUTE,
                ioFlag: REORDER
            }));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypass(ownProps.effectID, {
                io: true,
                ioType: ROUTE,
                ioFlag: BYPASS
            }));
        },
        toggleSolo: () => {
            dispatch(toggleSolo(ownProps.effectID, {
                io: true,
                ioType: ROUTE,
                ioFlag: SOLO
            }));
        },
        removeMapping: axis => {
            dispatch(removeMapping(axis, {
                io: true,
                ioType: XYZ_MAP,
                ioFlag: REMOVE_MAP
            }));
        }
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;