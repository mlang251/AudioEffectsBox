import {connect} from 'react-redux';
import {removeEffectAndEmit, reorderEffectsAndEmit, toggleBypassAndEmit,
    toggleSoloAndEmit, removeMappingAndEmit} from '../actions/actionCreators';
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
        xyzMapList: xyzMapToParameter(state.get('xyzMap'), ownProps.effectID),
        axisToMap: state.get('mapping').get('currentAxis'),
        allowBypass: determineSoloing(state.get('effects'))
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: () => {
            dispatch(removeEffectAndEmit(ownProps.effectID));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffectsAndEmit(ownProps.effectID, direction));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypassAndEmit(ownProps.effectID));
        },
        toggleSolo: () => {
            dispatch(toggleSoloAndEmit(ownProps.effectID));
        },
        removeMapping: (axis, paramName) => {
            dispatch(removeMappingAndEmit(ownProps.effectID, paramName, axis, {
                io: true
            }));
        }
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;