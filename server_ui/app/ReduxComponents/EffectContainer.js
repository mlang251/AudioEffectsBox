import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';

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
        xyzMapList: xyzMapToParameter(state.xyzMap, ownProps.effectID),
        axisToMap: state.mapping.get('currentAxis'),
        allowBypass: determineSoloing(state.effects)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: () => {
            dispatch(removeEffect(ownProps.effectID, {io: true}));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffects(ownProps.effectID, direction, {io: true}));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypass(ownProps.effectID, {io: true}));
        },
        toggleSolo: () => {
            dispatch(toggleSolo(ownProps.effectID, {io: true}));
        },
        removeMapping: axis => {
            dispatch(removeMapping(axis, {io: true}));
        }
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;