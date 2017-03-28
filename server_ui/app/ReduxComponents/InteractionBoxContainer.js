import {connect} from 'react-redux';
import {Map} from 'immutable';
import InteractionBox from './InteractionBox';

const createStyles = (state) => {
    const coords = state.get('coords');
    const dimensions = state.get('dimensions');
    const isInBounds = state.get('isInBounds');
    const isTracking = state.get('isTracking');

    let height = 0;
    let width = 0;
    let depth = 0;
    let x = 0;
    let y = 0;
    let z = 0;

    if (!dimensions.isEmpty()) {
        const Height = dimensions.get('Height');
        const Width = dimensions.get('Width');
        const Depth = dimensions.get('Depth');
        const widthHeightRatio = Width/Height;
        const depthHeightRatio = Depth/Height;
        const maxHeight = window.innerHeight * 0.4;
        const maxWidth = window.innerWidth * 0.833;
        const maxDepth = window.innerHeight * 1.4;
        
        if (maxHeight * widthHeightRatio > maxWidth) {
            if (maxWidth * depthHeightRatio / widthHeightRatio > maxDepth) {
                depth = maxDepth;
                height = depth/depthHeightRatio;
                width = height * widthHeightRatio;
            } else {
                width = maxWidth;
                height = width/widthHeightRatio;
                depth = height * depthHeightRatio;
            }
        } else if (maxHeight * depthHeightRatio > maxDepth) {
            if (maxDepth * widthHeightRatio / depthHeightRatio > maxWidth) {
                width = maxWidth;
                height = width/widthHeightRatio;
                depth = height * depthHeightRatio;
            } else {
                depth = maxDepth;
                height = depth/depthHeightRatio;
                width = height * widthHeightRatio;
            }
        } else {
            height = maxHeight;
            width = height * widthHeightRatio;
            depth = height * depthHeightRatio;
        }
    }

    if (!coords.isEmpty()) {
        x = coords.get(0);
        y = coords.get(1);
        z = coords.get(2);
    }

    const pointerColor = !isInBounds ? '#C00' : isTracking ? '#080' : '#EE0';
    const minDimension = Math.min(height, width, depth);
    return Map({
        container: Map({
            height: height,
            width: width
        }),
        cube: Map({
            transform: `translateZ(-${depth}px) rotateX(-20deg)`
        }),
        pointer: Map({
            height: minDimension/10,
            width: minDimension/10,
            backgroundImage: `radial-gradient(circle at ${minDimension/40}px ${minDimension/40}px, ${pointerColor}, #222)`,
            transform: `
                translateX(${x * width - minDimension/20}px) 
                translateY(${-y * height + minDimension/20}px) 
                translateZ(${depth/2 - z * depth}px)
            `
        }),
        shadow: Map({
            transform: `rotateX(90deg) translateZ(-${y * height}px)`,
        }),
        front: Map({
            height: height,
            width: width,
            transform: `rotateY(0deg) translateZ(${depth/2}px)`,
        }),
        back: Map({
            height: height,
            width: width,
            backgroundSize: `${height/30}px ${height/30}px`,
            backgroundPosition: `${height/60}px ${height/60}px`,
            transform: `rotateX(180deg) translateZ(${depth/2}px)`
        }),
        right: Map({
            height: height,
            width: depth,
            backgroundSize: `${height/30}px ${height/30}px`,
            backgroundPosition: `${height/60}px ${height/60}px`,
            transform: `rotateY(90deg) translateZ(${width/2}px)`
        }),
        left: Map({
            height: height,
            width: depth,
            backgroundSize: `${height/30}px ${height/30}px`,
            backgroundPosition: `${height/60}px ${height/60}px`,
            transform: `rotateY(-90deg) translateZ(${width/2}px)`
        }),
        top: Map({
            height: depth,
            width: width,
            transform: `rotateX(90deg) translateZ(${height/2}px)`
        }),
        bottom: Map({
            height: depth,
            width: width,
            backgroundSize: `${height/15}px ${height/15}px`,
            backgroundPosition: `${height/30}px ${height/30}px`,
            transform: `rotateX(-90deg) translateZ(${height/2}px)`
        }),
    });
}

const mapStateToProps = (state) => {
    return {
        applyStyles: createStyles(state.interactionBox)
    };
};

const InteractionBoxContainer = connect(
    mapStateToProps
)(InteractionBox);

export default InteractionBoxContainer;