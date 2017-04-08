import {connect} from 'react-redux';
import {removeEffectAndEmit, reorderEffectsAndEmit, toggleBypassAndEmit, toggleSoloAndEmit} from '../actions/actionCreators';
import Effect from './Effect';
import {List, Map} from 'immutable';

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
        }        
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;