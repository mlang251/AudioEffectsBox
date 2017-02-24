import React from 'react';
import InteractionBox from './InteractionBox';
import Display from './Display';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';
import Immutable from 'immutable';

class InteractionBoxContainer extends React.PureComponent {
    constructor() {
        super();
        this.createStyles = this.createStyles.bind(this);
    }

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
            
            if (maxHeight * widthHeightRatio > maxWidth) {
                width = maxWidth;
                height = width/widthHeightRatio;
            } else {
                height = maxHeight;
                width = height * widthHeightRatio;
            }
            depth = height * depthHeightRatio;
        }

        if (!this.props.coords.isEmpty()) {
            const coords = this.props.coords.toJS();
            x = coords[0];
            y = coords[1];
            z = coords[2];
        }

        const pointerColor = !this.props.isInBounds ? '#C00' : this.props.isTracking ? '#080' : '#EE0';

        return Immutable.fromJS({
            container: {
                height: height,
                width: width
            },
            cube: {
                transform: `translateZ(-${depth}px) rotateX(-20deg)`
            },
            pointer: {
                height: height/10,
                width: height/10,
                backgroundImage: `radial-gradient(circle at ${height/40}px ${height/40}px, ${pointerColor}, #222)`,
                transform: `translateX(${x * width}px) translateY(${y * height}px) translateZ(${depth/2 + z * depth}px)`
            },
            shadow: {
                transform: `rotateX(90deg) translateZ(-${height/20 - y * height}px)`,
            },
            front: {
                transform: `rotateY(0deg) translateZ(${depth/2}px)`,
            },
            back: {
                transform: `rotateX(180deg) translateZ(${depth/2}px)`,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
            },
            right: {
                transform: `rotateY(90deg) translateZ(${depth/2}px)`,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
            },
            left: {
                transform: `rotateY(-90deg) translateZ(${depth/2}px)`,
                backgroundSize: `${height/30}px ${height/30}px`,
                backgroundPosition: `${height/60}px ${height/60}px`,
            },
            top: {
                transform: `rotateX(90deg) translateZ(${depth/2}px)`,
            },
            bottom: {
                transform: `rotateX(-90deg) translateZ(${depth/2}px)`,
                backgroundSize: `${height/15}px ${height/15}px`,
                backgroundPosition: `${height/30}px ${height/30}px`,
            },
        });
    }
    
    render() {
        const styles = this.createStyles();
        return (
            <div>
                <Display if = {this.props.isConnected}>
                    <InteractionBox style = {styles} />
                </Display>
                <Display if = {!this.props.isConnected}>
                    <InteractionBoxPlaceholder />
                </Display>
            </div>
        );
    }
}

export default InteractionBoxContainer;