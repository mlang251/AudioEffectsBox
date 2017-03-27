import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';

const xyzMapToParameter = (xyzMap, effectID) => {
    let xyzMapList = List();
    xyzMap.forEach(axis => {
        if (axis.get('effectID') == effectID) {
            xyzMapList.push(Map({
                paramName: axis.get('paramName'),
                axisName: axis.get('axis')
            }));
        }
    });
    return xyzMapList;
};


const mapStateToProps = (state, ownProps) => {
    return {
        xyzMapList: xyzMapToParameter(state.xyzMap, ownProps.effectID)
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