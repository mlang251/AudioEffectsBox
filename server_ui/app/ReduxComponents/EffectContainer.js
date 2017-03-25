import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo} from '../actions/actionCreators';
import Effect from './Effect';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: (effectID) => {
            dispatch(removeEffect(ownProps.effectID));
        },
        reorderEffects: (effectID, direction) => {
            dispatch(reorderEffects(ownProps.effectID, direction));
        }, 
        toggleBypass: (effectID) => {
            dispatch(mapToParameter(ownProps.effectID));
        },
        toggleSolo: (effectID) => {
            dispatch(toggleSolo(ownProps.effectID));
        }
    };
};

const EffectContainer = connect(
    null,
    mapDispatchToProps
)(Effect);

export default EffectContainer;