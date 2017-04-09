import {connect} from 'react-redux';
import {Map} from 'immutable';
import InteractionBox from './InteractionBox';

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
 * The state of the interaction box
 * @typedef {external:Map} InteractionBox
 * @property {external:List.<Number>} InteractionBox.coords - The current coordinates of the user's hand within the Leap's field of 
 *     vision. This is represented by the pointer in the InteractionBox component.
 * @property {external:Map} InteractionBox.dimensions - The dimensions of the Leap's field of vision, represented by the dimensions
 *     of the InteractionBox component.
 * @property {Number} InteractionBox.dimensions.Height - The height of the Leap's field of vision.
 * @property {Number} InteractionBox.dimensions.Width - The width of the Leap's field of vision.
 * @property {Number} InteractionBox.dimensions.Depth - The depth of the Leap's field of vision.
 * @property {Boolean} InteractionBox.isConnected - Represents whether or not the Leap is connected to the computer
 * @property {Boolean} InteractionBox.isInBounds - Represents whether or not user's hand is within the Leap's field of vision
 * @property {Boolean} InteractionBox.isTracking - Represents whether or not the user has put the system into hand tracking mode
 */

/**
 * Reads the coordinates and status of the interaction box to create styles for the InteractionBox component. If dimensions are 
 *     provided, the method will read the height, width, and depth of the interaction box as seen by the Leap, and build a 3D
 *     representation of this field of vision to scale in the browser. It detects what the maximum size of the box can be,
 *     depending on the size of the browser window. It then computes which of the three dimensions can be at it's maximum 
 *     value within the browser, without making either of the other two dimensions go outside of their respective maximum values.
 *     This is done so that the interaction box is as large as possible without getting in the way of other components. It sets the 
 *     values of height, width, and depth accordingly. If coordinates are provided, the method sets the values of x, y, and z
 *     accordingly. It then chooses a color for the pointer (the ball that indicates where the user's hand is within the Leap's
 *     field of vision) depending on the interaction box status. If the user's hand is out of bounds, the pointer is red. If the
 *     user's hand is in bounds but tracking mode is off, the pointer is yellow. If the user's hand is in bounds and tracking mode
 *     is on, the pointer is green. The minimum dimension of the interaction box is calculated so that it can be used to render
 *     the pointer and it's shadow so that their sizees are 10 times less than the minimum dimension of the box.
 * @param {InteractionBox} interactionBox - The current state of the interaction box
 * @returns {external:Map.<String, external:Map>} propStyles - The fully computed styles. This includes the dimensions of the interaction
 *     box, which is made using 3D CSS transforms, as well as the color and positioning of the pointer and it's shadow. The pointer and
 *     shadow are translated within the interaction box using 3D CSS transforms.
 */
const createStyles = (interactionBox) => {
    const coords = interactionBox.get('coords');
    const dimensions = interactionBox.get('dimensions');
    const isInBounds = interactionBox.get('isInBounds');
    const isTracking = interactionBox.get('isTracking');

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

/**
 * Maps the state contained in the store to props to pass down to the InteractionBox component
 * @param {external:Map} state - The state contained in the store
 * @returns {Object} props - Props to pass down to the InteractionBox component
 * @property {external:Map.<String, external:Map>} props.propStyles - The fully computed styles to pass down to the InteractionBox
 */
const mapStateToProps = (state) => {
    return {
        propStyles: createStyles(state.get('interactionBox'))
    };
};

const InteractionBoxContainer = connect(
    mapStateToProps
)(InteractionBox);

export default InteractionBoxContainer;