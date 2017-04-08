import React from 'react';
import InteractionBoxContainer from './InteractionBoxContainer';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';
import SignalChainContainer from './SignalChainContainer';
import SidebarContainer from './SidebarContainer';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';
import {List} from 'immutable';

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
const App = ({message, isConnected}) => (
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
                    <p>Received message on port 57120: {message}</p>
                    <section style = {styles.interactionBoxContainer}>
                        {isConnected ? <InteractionBoxContainer /> : <InteractionBoxPlaceholder />}
                    </section>
                    <section style = {styles.signalChainContainer}>
                        <SignalChainContainer />
                    </section>
                </div>
                <div className = 'col-sm-2'>
                    <SidebarContainer />
                </div>
            </div>
        </div>
    </div>
);

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
