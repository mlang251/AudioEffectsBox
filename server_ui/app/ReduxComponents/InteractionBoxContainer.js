import {connect} from 'react-redux';
import InteractionBox from './InteractionBox';

const propStyles = {
    // Create styles for InteractionBox
}

const mapStateToProps = (state, propStyles) => {
    return {
        coords: state.interactionBox.get('coords'),
        dimensions: state.interactionBox.get('dimensions'),
        isInBounds: state.interactionBox.get('isInBounds'),
        isTracking: state.interactionBox.get('isTracking')
    };
};

const InteractionBoxContainer = connect(
    mapStateToProps
)(InteractionBox);

export default InteractionBoxContainer;