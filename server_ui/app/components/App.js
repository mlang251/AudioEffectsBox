import React from 'react';
import InteractionBoxContainer from './InteractionBoxContainer';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';
import SignalChainContainer from './SignalChainContainer';
import SidebarContainer from './SidebarContainer';
import Radium from 'radium';

/**
 * The App component. Responsible for rendering the App and child components. Appears as child component of AppContainer,
 *     child components are InteractionBoxContainer, InteractionBoxPlaceholder, SignalChainContainer, SidebarContainer.
 * @param {Object} props - Passed down from AppContainer
 * @property {String} props.message - The message to be displayed at the top of the app
 * @property {Boolean} props.isConnected - Represents whether or not the Leap is connected to the computer. This property is
 *     used to render either the InteractionBoxContainer, or the InteractionBoxPlaceholder
 */
const App = ({message, isConnected}) => (
    <div 
        className = 'container-fluid'
        style = {styles.container}>
        <div 
            className = 'row'
            style = {styles.div}>
            <div 
                className = 'col-sm-10'
                style = {styles.div}>
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
);

const styles = {
    container: {
        height: '100%'
    },
    div: {
        height: '100%'
    },
    interactionBoxContainer: {
        height: 450,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signalChainContainer: {
        height: 250,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export default Radium(App);
