import React from 'react';
import InteractionBoxContainer from './InteractionBoxContainer';
import SignalChainContainer from './SignalChainContainer';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';
import SidebarContainer from './SidebarContainer';

const App = props => (
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
                    <p>Received message on port 57120: {props.message}</p>
                    <section style = {styles.interactionBoxContainer}>
                        <InteractionBoxContainer
                            coords = {props.interactionBox.get('coords')}
                            dimensions = {props.interactionBox.get('dimensions')}
                            isConnected = {props.interactionBox.get('isConnected')}
                            isInBounds = {props.interactionBox.get('isInBounds')}
                            isTracking = {props.interactionBox.get('isTracking')} />
                    </section>
                    <section style = {styles.signalChainContainer}>
                        <SignalChainContainer
                            onParameterChange = {props.onParameterChange}
                            parameterValues = {props.parameterValues}
                            isMapping = {props.isMapping}
                            mapToParameter = {props.mapToParameter}
                            xyzMap = {props.xyzMap}
                            removeEffect = {props.removeEffect}
                            toggleBypass = {props.toggleBypass}
                            toggleSolo = {props.toggleSolo}
                            removeMapping = {props.removeMapping}
                            reorderEffects = {props.reorderEffects}
                            effects = {props.effects} />
                    </section>
                </div>
                <div className = 'col-sm-2'>
                    <SidebarContainer
                        handleEffectButtonClick = {props.addEffectToChain}
                        handleAxisButtonClick = {props.toggleMapping} />
                </div>
            </div>
        </div>
    </div>
);

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

export default Radium(App);
