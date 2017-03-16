import React from 'react';
import InteractionBox from './InteractionBox';
import Display from './Display';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';
import Immutable from 'immutable';

/**
 * The InteractionBoxContainer module. Responsible for displaying the InteractionBox, or the InteractionBoxPlaceholder,
 *     depending on whether or not the Leap is connected. Creates styles for the InteractionBox based on data from the Leap.
 *     Appears as child component of App, child components are Display, InteractionBox, and InteractionBoxPlaceholder.
 * @module InteractionBoxContainer
 * @see module:App
 * @see module:Display
 * @see module:InteractionBox
 * @see module:InteractionBoxPlaceholder
 */

/** 
 * Class responsible for displaying the InteractionBox, or the InteractionBoxPlaceholder, depending on whether or not 
 *     the Leap is connected. Creates styles for the InteractionBox based on data from the Leap.
 * @extends external:PureComponent 
 */
class InteractionBoxContainer extends React.PureComponent {
    /** Creates the InteractionBoxContainer instance. Binds methods to this instance */
    constructor() {
        super();
        this.createStyles = this.createStyles.bind(this);
    }

    /**
     * Creates styles for the InteractionBox, based on the Leap data and status updates. If box dimensions are provided
     *     via props.dimensions, it determines the dimensions, in pixels, with which to render the 3D representation of the
     *     Leap's field of vision. It calculates this using the ratio of the dimensions provided by the Leap, and makes
     *     the 3D representation so that it is as large as possible within the constraints of it's containing block. If
     *     Leap hand tracking data is available, it positions the pointer to show where the user's hand is in relation to 
     *     the 3D representation. The pointer is rendered with different colors, depending on the Leap status updates.
     * @returns {external:Map} - An Immutable Map representing a style object for various components in the InteractionBox
     */
    createStyles() {
        let height = 0;
        let width = 0;
        let depth = 0;
        let x = 0;
        let y = 0;
        let z = 0;

        if (!this.props.dimensions.isEmpty()) {
            const {Height, Width, Depth} = this.props.dimensions.toJS();
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

        if (!this.props.coords.isEmpty()) {
            const coords = this.props.coords.toJS();
            x = coords[0];
            y = coords[1];
            z = coords[2];
        }

        const pointerColor = !this.props.isInBounds ? '#C00' : this.props.isTracking ? '#080' : '#EE0';
        const minDimension = Math.min(height, width, depth);
        return Immutable.fromJS({
            container: {
                height: height,
                width: width
            },
            cube: {
                transform: `translateZ(-${depth}px) rotateX(-20deg)`
            },
            pointer: {
                height: minDimension/10,
                width: minDimension/10,
                backgroundImage: `radial-gradient(circle at ${minDimension/40}px ${minDimension/40}px, ${pointerColor}, #222)`,
                transform: `
                    translateX(${x * width - minDimension/20}px) 
                    translateY(${-y * height + minDimension/20}px) 
                    translateZ(${depth/2 - z * depth}px)
                `
            },
            shadow: {
                transform: `rotateX(90deg) translateZ(-${y * height}px)`,
            },
            front: {
                height: height,
                width: width,
                transform: `rotateY(0deg) translateZ(${depth/2}px)`,
            },
            back: {
                height: height,
                width: width,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
                transform: `rotateX(180deg) translateZ(${depth/2}px)`
            },
            right: {
                height: height,
                width: depth,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
                transform: `rotateY(90deg) translateZ(${width/2}px)`
            },
            left: {
                height: height,
                width: depth,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
                transform: `rotateY(-90deg) translateZ(${width/2}px)`
            },
            top: {
                height: depth,
                width: width,
                transform: `rotateX(90deg) translateZ(${height/2}px)`
            },
            bottom: {
                height: depth,
                width: width,
                backgroundSize: `${height/15}px ${height/15}px`,
                backgroundPosition: `${height/30}px ${height/30}px`,
                transform: `rotateX(-90deg) translateZ(${height/2}px)`
            },
        });
    }
    
    /**
     * Renders the InteractionBox if the Leap is connected, otherwise, renders the InteractionBoxPlaceholder
     * @see module:Display
     * @see module:InteractionBox
     * @see module:InteractionBoxPlaceholder
     */
    render() {
        return (
            <div>
                <Display if = {this.props.isConnected}>
                    <InteractionBox style = {this.createStyles()} />
                </Display>
                <Display if = {!this.props.isConnected}>
                    <InteractionBoxPlaceholder />
                </Display>
            </div>
        );
    }
}

/** The InteractionBoxContainer component */
export default InteractionBoxContainer;