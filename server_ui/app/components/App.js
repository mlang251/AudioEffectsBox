import React from 'react';
import SignalChain from './SignalChain';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';
import Sidebar from './Sidebar';

const App = props => (
    <div>
        <AppBar 
            showMenuIconButton = {false}
            title = "Audio Expression Box" />
        <div className = 'container-fluid'>
            <div className = 'row'>
                <div className = 'col-sm-10'>
                    <p>Received message on port 57120: {props.message}</p>
                    <SignalChain
                        onParameterChange = {props.onParameterChange}
                        parameterValues = {props.parameterValues}
                        isMapping = {props.isMapping}
                        mapToParameter = {props.mapToParameter}
                        xyzMap = {props.xyzMap}
                        removeEffect = {props.removeEffect}
                        toggleBypass = {props.toggleBypass}
                        toggleSolo = {props.toggleSolo}>{props.children}</SignalChain>
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

export default Radium(App);
