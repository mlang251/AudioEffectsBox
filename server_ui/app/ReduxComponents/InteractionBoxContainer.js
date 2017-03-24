import {connect} from 'react-redux';
import InteractionBox from './InteractionBox';

const mapStateToProps = state => {
    return {
        interactionBox: state.interactionBox
    };
};

const InteractionBoxContainer = connect(
    mapStateToProps
)(InteractionBox);

export default InteractionBoxContainer;