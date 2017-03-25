import {connect} from 'react-redux';
import {removeEffect, reorderEffects, toggleBypass, toggleSolo} from '../actions/actionCreators';
import Effect from './Effect';

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
    null,
    mapDispatchToProps
)(Effect);

export default EffectContainer;