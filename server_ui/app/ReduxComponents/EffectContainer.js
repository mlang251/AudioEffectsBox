import {connect} from 'react-redux';
import {removeEffectAndEmitRoute, reorderEffectsAndEmitRoute, toggleBypassAndEmitRoute,
    toggleSoloAndEmitRoute, removeMapping} from '../actions/actionCreators';
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
            dispatch(removeEffectAndEmitRoute(ownProps.effectID));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffectsAndEmitRoute(ownProps.effectID, direction));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypassAndEmitRoute(ownProps.effectID));
        },
        toggleSolo: () => {
            dispatch(toggleSoloAndEmitRoute(ownProps.effectID));
        },
        removeMapping: axis => {
            dispatch(removeMapping(axis));
        }
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;