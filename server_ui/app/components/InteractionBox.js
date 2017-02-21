import React from 'react';
import Radium from 'radium';

class InteractionBox extends React.PureComponent {
    constructor() {
        super();
        this.createStyles = this.createStyles.bind(this);
    }

    createStyles(coords) {
        //TODO: create the xyz translations based on the coordinates
        return {
            pointerStyles: {

            },
            shadowStyles: {

            }
        }
    }
    
    render() {
        const {pointerStyles, shadowStyles} = this.createStyles(this.props.coords);
        return (
            <section style = {styles.container}>
                <div style = {styles.cube}>
                    <div style = {Object.assign({}, styles.pointer, pointerStyles)}>
                        <span style = {Object.assign({}, styles.shadow, shadowStyles)}></span>
                    </div>
                    <figure style = {Object.assign({}, styles.figure, styles.front)}></figure>
                    <figure style = {Object.assign({}, styles.figure, styles.back)}></figure>
                    <figure style = {Object.assign({}, styles.figure, styles.right)}></figure>
                    <figure style = {Object.assign({}, styles.figure, styles.left)}></figure>
                    <figure style = {Object.assign({}, styles.figure, styles.top)}></figure>
                    <figure style = {Object.assign({}, styles.figure, styles.bottom)}></figure>
                </div>
            </section>
        );
    }
}

export default Radium(InteractionBox);
const height = window.innerHeight*0.4;
const styles = {
    container: {
        width: height,
        height: height,
        maxHeight: '40vh',
        position: 'relative',
        perspective: 1000,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cube: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transformStyle: 'preserve-3d',
        transform: `translateZ(-${height}px) rotateX(-20deg)`
    },
    pointer: {
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'black',
        bottom: 0,
        left: 0,
        height: height/10,
        width: height/10,
        margin: 0,
        backgroundImage: `radial-gradient(circle at ${height/40}px ${height/40}px, #080, #222)`,
        transform: `translateZ(${height/2}px)`
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 50%)',
        transform: `rotateX(90deg) translateZ(-${height/20}px)`,
        zIndex: -1
    },
    figure: {
        margin: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundImage: `linear-gradient(0deg, transparent 45%, #009 50%, transparent 55%, transparent 100%), 
            linear-gradient(90deg, transparent 45%, #009 50%, transparent 55%, transparent 100%)`,
        opacity: 0.5
    },
    front: {
        transform: `rotateY(0deg) translateZ(${height/2}px)`,
        backgroundColor: '#FFF',
        backgroundImage: '',
        opacity: 0.2
    },
    back: {
        transform: `rotateX(180deg) translateZ(${height/2}px)`,
        backgroundSize: `${height/30}px ${height/30}px`,
        backgroundPosition: `${height/60}px ${height/60}px`,
        backgroundColor: '#AAA'
    },
    right: {
        transform: `rotateY(90deg) translateZ(${height/2}px)`,
        backgroundSize: `${height/30}px ${height/30}px`,
        backgroundPosition: `${height/60}px ${height/60}px`,
        backgroundColor: '#AAA'
    },
    left: {
        transform: `rotateY(-90deg) translateZ(${height/2}px)`,
        backgroundSize: `${height/30}px ${height/30}px`,
        backgroundPosition: `${height/60}px ${height/60}px`,
        backgroundColor: '#AAA'
    },
    top: {
        transform: `rotateX(90deg) translateZ(${height/2}px)`,
        backgroundColor: '#EEE',
        backgroundImage: '',
        opacity: 0.2
    },
    bottom: {
        transform: `rotateX(-90deg) translateZ(${height/2}px)`,
        backgroundSize: `${height/15}px ${height/15}px`,
        backgroundPosition: `${height/30}px ${height/30}px`,
        backgroundColor: '#EEE'
    },
}