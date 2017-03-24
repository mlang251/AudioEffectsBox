import React from 'react';
import InteractionBoxContainer from './InteractionBoxContainer';
import SignalChainContainer from './SignalChainContainer';
import SidebarContainer from './SidebarContainer';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';

/**
 * The App module. Responsible for rendering the App and child components. Appears as child component of AppContainer,
 *     child components are InteractionBoxContainer, SignalChainContainer, SidebarContainer.
 * @module App
 * @see module:AppContainer
 * @see module:InteractionBoxContainer
 * @see module:SignalChainContainer
 * @see module:SidebarContainer
 * @see {@link http://www.material-ui.com/#/components/app-bar}
 */

/**
 * Class responsible for rendering the App and child components.
 * @extends external:ReactPureComponent
 */
class App extends React.PureComponent {
    /** Create the App component instance */
    constructor() {
        super();
    }

    /**
     * Render the App and it's child components.
     * @see module:InteractionBoxContainer
     * @see module:SignalChainContainer
     * @see module:SidebarContainer
     * @see {@link http://www.material-ui.com/#/components/app-bar}
     */
    render() {
        return (
            <div>
                <AppBar 
                    showMenuIconButton = {false}
                    title = "Audio Expression Box" />
                <div 
                    className = 'container-fluid'
                    style = {styles.container}>
                    <div 
                        className = 'row'
                        style = {styles.div}>
                        <div 
                            className = 'col-sm-10'
                            style = {styles.div}>
                            <p>Received message on port 57120: {this.props.message}</p>
                            <section style = {styles.interactionBoxContainer}>
                                <InteractionBoxContainer
                                    coords = {this.props.interactionBox.get('coords')}
                                    dimensions = {this.props.interactionBox.get('dimensions')}
                                    isConnected = {this.props.interactionBox.get('isConnected')}
                                    isInBounds = {this.props.interactionBox.get('isInBounds')}
                                    isTracking = {this.props.interactionBox.get('isTracking')} />
                            </section>
                            <section style = {styles.signalChainContainer}>
                                <SignalChainContainer
                                    onParameterChange = {this.props.onParameterChange}
                                    parameterValues = {this.props.parameterValues}
                                    isMapping = {this.props.isMapping}
                                    mapToParameter = {this.props.mapToParameter}
                                    xyzMap = {this.props.xyzMap}
                                    removeEffect = {this.props.removeEffect}
                                    toggleBypass = {this.props.toggleBypass}
                                    toggleSolo = {this.props.toggleSolo}
                                    removeMapping = {this.props.removeMapping}
                                    reorderEffects = {this.props.reorderEffects}
                                    effects = {this.props.effects} />
                            </section>
                        </div>
                        <div className = 'col-sm-2'>
                            <SidebarContainer
                                handleEffectButtonClick = {this.props.addEffectToChain}
                                handleAxisButtonClick = {this.props.toggleMapping} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * A style object whose members are passed to components when rendering.
 * @type {Object}
 */
const styles = {
    container: {
        height: '90vh'
    },
    div: {
        height: '100%'
    },
    interactionBoxContainer: {
        height: '50vh',
        paddingTop: '5vh',
        paddingBottom: '5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signalChainContainer: {
        height: '30vh',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

/** The App module */
export default Radium(App);
