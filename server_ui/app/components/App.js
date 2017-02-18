import React from 'react';
import InteractionBox from './InteractionBox';
import SignalChain from './SignalChain';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';
import Sidebar from './Sidebar';

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
                    <section 
                        id = 'interactionBoxContainer'
                        style = {styles.interactionBoxContainer}>
                        <InteractionBox />
                    </section>
                    <section style = {styles.signalChainContainer}>
                        <SignalChain
                            onParameterChange = {props.onParameterChange}
                            parameterValues = {props.parameterValues}
                            isMapping = {props.isMapping}
                            mapToParameter = {props.mapToParameter}
                            xyzMap = {props.xyzMap}
                            removeEffect = {props.removeEffect}
                            toggleBypass = {props.toggleBypass}
                            toggleSolo = {props.toggleSolo}
                            removeMapping = {props.removeMapping}
                            reorderEffects = {props.reorderEffects}>{props.children}</SignalChain>
                    </section>
                </div>
                <div className = 'col-sm-2'>
                    <Sidebar
                        handleEffectButtonClick = {props.addEffectToChain}
                        handleAxisButtonClick = {props.toggleMapping} />
                </div>
            </div>
        </div>
    </div>
);

const styles = {
    container: {
        height: window.innerHeight - 64,
        paddingBottom: 25
    },
    div: {
        height: '100%'
    },
    interactionBoxContainer: {
        height: '60%',
        paddingTop: 30,
        paddingBottom: 30
    },
    signalChainContainer: {
        height: '35%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export default Radium(App);
