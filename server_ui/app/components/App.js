import React from 'react';
import SignalChain from './SignalChain';
import Radium from 'radium';

const App = props => (
    <div className = 'container-fluid'>
        <div className = 'row'>
            <div className = 'col-sm-10'>
                <p>Received message on port 57120: {props.message}</p>
                <SignalChain>{props.children}</SignalChain>
            </div>
            <div className = 'col-sm-2'>
                <h3>Effects</h3>
                <button type = 'button'
                        style = {styles.button}
                        onClick = {() => props.handleClick('distortion')}>Add Distortion</button>
                <button type = 'button'
                        style = {styles.button}
                        onClick = {() => props.handleClick('bandpass')}>Add Bandpass</button>
                <button type = 'button'
                        style = {styles.button}
                        onClick = {() => props.handleClick('reverb')}>Add Reverb</button>
            </div>
        </div>
    </div>
);

const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

export default Radium(App);
