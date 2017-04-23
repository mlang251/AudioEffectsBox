import React from 'react';
import Radium from 'radium';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * The Pointer module. This renders the the position of the user's hand. Appears as a child component of the PointerContainer component.
 * @param {Object} props - The props passed down by the PointerContainer component
 * @property {external:Map.<String, external:Map>} props.propStyles - The styles computed by the PointerContainer component
 */
const Pointer = ({propStyles}) => {
    console.log('pointer')
    return (
    <div style = {Object.assign({}, styles.pointer, propStyles.get('pointer').toJS())}>
        <span style = {Object.assign({}, styles.shadow, propStyles.get('shadow').toJS())}></span>
    </div>
);
}

const styles = {
    pointer: {
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'black',
        bottom: 0,
        left: 0,
        margin: 0,
        transformStyle: 'preserve-3d'
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 50%)',
        zIndex: -1
    }
}

export default Radium(Pointer);