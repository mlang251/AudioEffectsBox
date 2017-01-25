import React from 'react';
import io from 'socket.io-client';
import Form from './Form';
import SignalChain from './SignalChain';

const App = props => (
    <div className = 'container'>
        <div className = 'row'>
            <div className = 'col-sm-8'>
                <Form handleSubmit = {props.submitForm}
                handleChange = {props.handleInput}
                value = {props.value} />
                <p>Message: {props.message}</p>
                <SignalChain />
            </div>
            <div className = 'col-sm-8'>
                //TODO: Add sidebar for choosing effects
            </div>
        </div>
    </div>
);

export default App;
