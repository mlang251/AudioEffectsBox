import {connect} from 'react-redux';
import {updateMessage} from '../actions/actionCreators';
import App from './App';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * Maps the state contained in the store to props to pass down to the App component
 * @param {external:Map} state - The state contained in the store
 * @returns {Object} props - Props to be passed to the App component
 * @property {String} props.message - The message to be displayed at the top of the app
 * @property {Boolean} props.isConnected - Represents whether or not the Leap is connected to the computer. This property is
 *     used to render either the InteractionBoxContainer, or the InteractionBoxPlaceholder
 */
const mapStateToProps = state => {
    return {
        message: state.get('message'),
        isConnected: state.get('interactionBox').get('isConnected')
    };
};

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;