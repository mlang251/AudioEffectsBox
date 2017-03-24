import {connect} from 'react-redux';
import InteractionBox from './InteractionBox';

const mapStateToProps = state => {
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