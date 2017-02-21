import React from 'react';
import Radium from 'radium';

class InteractionBox extends React.PureComponent {
    constructor() {
        super();
    }
    
    render() {
        return (
            <section style = {styles.container}>
                <div style = {styles.cube}>
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

const styles = {
    //TODO: width and height should be 100% as containing block width
    container: {
        width: 200,
        height: 200,
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
        transform: 'translateZ(-100px) rotateX(-20deg)'
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
        transform: 'rotateY(0deg) translateZ(100px)',
        backgroundColor: '#FFF',
        backgroundImage: '',
        opacity: 0.2
    },
    back: {
        transform: 'rotateX(180deg) translateZ(100px)',
        backgroundSize: '10px 10px',
        backgroundPosition: '5px 5px',
        backgroundColor: '#AAA'
    },
    right: {
        transform: 'rotateY(90deg) translateZ(100px)',
        backgroundSize: '10px 10px',
        backgroundPosition: '5px 5px',
        backgroundColor: '#AAA'
    },
    left: {
        transform: 'rotateY(-90deg) translateZ(100px)',
        backgroundSize: '10px 10px',
        backgroundPosition: '5px 5px',
        backgroundColor: '#AAA'
    },
    top: {
        transform: 'rotateX(90deg) translateZ(100px)',
        backgroundColor: '#EEE',
        backgroundImage: '',
        opacity: 0.2
    },
    bottom: {
        transform: 'rotateX(-90deg) translateZ(100px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '10px 10px',
        backgroundColor: '#EEE'
    },
}