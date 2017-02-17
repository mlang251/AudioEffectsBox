import React from 'react';
import Radium from 'radium';

class InteractionBox extends React.PureComponent {
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
        )
    }
}

export default Radium(InteractionBox);

const styles = {
    container: {
        width: 200,
        height: 200,
        position: 'relative',
        perspective: 1000,
        marginTop: 30,
        marginBottom: 30
    },
    cube: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        transformStyle: 'preserve-3d',
        transform: 'translateZ(-100px)'
    },
    figure: {
        margin: 0,
        width: 196,
        height: 196,
        display: 'block',
        position: 'absolute',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        opacity: '0.5'
    },
    front: {
        transform: 'rotateY(0deg) translateZ(100px)',
        backgroundColor: '#800'
    },
    back: {
        transform: 'rotateX(180deg) translateZ(100px)',
        backgroundColor: '#F00'
    },
    right: {
        transform: 'rotateY(90deg) translateZ(100px)',
        backgroundColor: '#080'
    },
    left: {
        transform: 'rotateY(-90deg) translateZ(100px)',
        backgroundColor: '#0F0'
    },
    top: {
        transform: 'rotateX(90deg) translateZ(100px)',
        backgroundColor: '#008'
    },
    bottom: {
        transform: 'rotateX(-90deg) translateZ(100px)',
        backgroundColor: '#00F'
    },
}