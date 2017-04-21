import React from 'react';
import Radium from 'radium';
import PointerContainer from './PointerContainer';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * The InteractionBox module. This renders the 3D representation of the Leap field of vision, as well as the position of the 
 *     user's hand and the state of the InteractionBox. Appears as a child component of the InteractionBoxContainer component,
 *     child component is PointerContainer.
 * @param {Object} props - The props passed down by the InteractionBoxContainer component
 * @property {external:Map.<String, external:Map>} props.propStyles - The styles computed by the InteractionBoxContainer component
 */
const InteractionBox = ({propStyles}) => (
    <section style = {Object.assign({}, styles.container, propStyles.get('container').toJS())}>
        <div style = {Object.assign({}, styles.cube, propStyles.get('cube').toJS())}>
            <PointerContainer 
                diameter = {propStyles.getIn(['pointer', 'diameter'])}
                color = {propStyles.getIn(['pointer', 'color'])} />
            <figure 
                id = 'front'
                style = {Object.assign({}, styles.figure, styles.front, propStyles.get('front').toJS())}></figure>
            <figure 
                id = 'back'
                style = {Object.assign({}, styles.figure, styles.back, propStyles.get('back').toJS())}></figure>
            <figure 
                id = 'right'
                style = {Object.assign({}, styles.figure, styles.right, propStyles.get('right').toJS())}></figure>
            <figure 
                id = 'left'
                style = {Object.assign({}, styles.figure, styles.left, propStyles.get('left').toJS())}></figure>
            <figure 
                id = 'top'
                style = {Object.assign({}, styles.figure, styles.top, propStyles.get('top').toJS())}></figure>
            <figure 
                id = 'bottom'
                style = {Object.assign({}, styles.figure, styles.bottom, propStyles.get('bottom').toJS())}></figure>
        </div>
    </section>
);

const styles = {
    container: {
        position: 'relative',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cube: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
    },
    figure: {
        margin: 0,
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
        backgroundColor: '#FFF',
        backgroundImage: '',
        opacity: 0.2
    },
    back: {
        backgroundColor: '#AAA'
    },
    right: {
        backgroundColor: '#AAA'
    },
    left: {
        backgroundColor: '#AAA'
    },
    top: {
        backgroundColor: '#EEE',
        backgroundImage: '',
        opacity: 0.2
    },
    bottom: {
        backgroundColor: '#EEE'
    },
}

export default Radium(InteractionBox);