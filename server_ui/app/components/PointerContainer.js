import {connect} from 'react-redux';
import {Map} from 'immutable';
import Pointer from './Pointer';

/**
 * The Immutable.js List datatype. Lists are ordered indexed dense collections, much like a JavaScript Array.
 * @external List
 * @see {@link https://facebook.github.io/immutable-js/docs/#/List}
 */

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * Reads the coordinates of the user's hand to create styles for the Pointer component. If coordinates are provided, the method 
 *     sets the values of x, y, and z accordingly.
 * @param {external:List.<Number>} coords - The current coordinates
 * @param {Number} diameter - The diameter of the pointer
 * @returns {external:Map.<String, external:Map>} propStyles - The fully computed styles. This includes the positioning of the pointer 
 *     and it's shadow. The pointer and shadow are translated within the interaction box using 3D CSS transforms.
 */
const createStyles = (coords, dimensions, color) => {
    const x = coords.get(0);
    const y = coords.get(1);
    const z = coords.get(2);

    const height = dimensions.get('height');
    const width = dimensions.get('width');
    const depth = dimensions.get('depth');
    const diameter = Math.min(height, width, depth);

    return Map({
        pointer: Map({
            height: diameter/10,
            width: diameter/10,
            backgroundImage: `radial-gradient(circle at ${diameter/40}px ${diameter/40}px, ${color}, #222)`,
            transform: `
                translateX(${x * width - diameter/20}px) 
                translateY(${-y * height + diameter/20}px) 
                translateZ(${depth/2 - z * depth}px)
            `
        }),
        shadow: Map({
            transform: `rotateX(90deg) translateZ(-${y * height}px)`,
        })
    });
}

/**
 * Maps the state contained in the store to props to pass down to the Pointer component
 * @param {external:Map} state - The state contained in the store
 * @param {external:Map} ownProps - Props passed down from the InteractionBox component
 * @property {Number} ownProps.diameter - The diameter of the pointer
 * @property {String} ownProps.color - The hex code of the color of the pointer
 * @returns {Object} props - Props to pass down to the Pointer component
 * @property {external:Map.<String, external:Map>} props.propStyles - The fully computed styles to pass down to the Pointer
 */
const mapStateToProps = (state, ownProps) => {
    return {
        propStyles: createStyles(state.get('coords'), ownProps.dimensions, ownProps.color)
    }
}

const PointerContainer = connect(
    mapStateToProps
)(Pointer);

export default PointerContainer;