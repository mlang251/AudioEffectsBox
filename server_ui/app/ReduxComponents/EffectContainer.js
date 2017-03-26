import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';

const xyzMapToParameter = (xyzMap) => {
    let xyzMapArray = List();
    xyzMap.forEach(axis => {
        if (axis.get('effectID') == effectID) {
            xyzMapArray.push(Map({
                paramName: axis.get('paramName'),
                axis: axis.get('axis')
            }));
        }
    });
    return xyzMapArray;
};


const mapStateToProps = (state, ownProps) => {
    return {
        xyzMap: xyzMapToParameter(state.xyzMap, ownProps.effectID)
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
            dispatch(mapToParameter(ownProps.effectID));
        },
        toggleSolo: () => {
            dispatch(toggleSolo(ownProps.effectID));
        }
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;