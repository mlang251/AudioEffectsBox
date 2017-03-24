import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo} from '../actions/actionCreators';
import Effect from './Effect';

const mapDispatchToProps = dispatch => {
    return {
        removeEffect: (effectID) => {
            dispatch(removeEffect(effectID));
        },
        reorderEffects: (effectID, direction) => {
            dispatch(reorderEffects(effectID, direction));
        }, 
        toggleBypass: (effectID) => {
            dispatch(mapToParameter(effectID));
        },
        toggleSolo: effectID => {
            dispatch(toggleSolo(effectID));
        }
    };
};

const EffectContainer = connect(
    null,
    mapDispatchToProps
)(Effect);

export default EffectContainer;