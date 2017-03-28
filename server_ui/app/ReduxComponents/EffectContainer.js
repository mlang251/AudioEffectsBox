import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';

const xyzMapToParameter = (xyzMap, effectID) => {
    let xyzMapList = List().asMutable();
    xyzMap.forEach(axis => {
        if (axis.get('effectID') == effectID) {
            xyzMapList = xyzMapList.push(Map({
                paramName: axis.get('param'),
                axisName: axis.get('axisName')
            }));
        }
    });
    return xyzMapList.asImmutable();
};


const mapStateToProps = (state, ownProps) => {
    return {
        xyzMapList: xyzMapToParameter(state.xyzMap, ownProps.effectID),
        axisToMap: state.mapping.get('currentAxis')
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: () => {
            dispatch(removeEffect(ownProps.effectID));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffects(ownProps.effectID, direction));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypass(ownProps.effectID));
        },
        toggleSolo: () => {
            dispatch(toggleSolo(ownProps.effectID));
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