import React from 'react';
import io from 'socket.io-client';
import Form from './Form';
import SignalChain from './SignalChain';
import App from './App';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            message: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    handleInput(e) {
        const value = e.target.value;
        this.setState({value: value});
    }

    parseMessage(messageStr) {
        const strArray = messageStr.split(' ');
        return strArray.map(value => {
            return Number(value);
        });
    }

    submitForm(e) {
        e.preventDefault();
        const message = this.parseMessage(this.state.value);
        this.socket.emit('route', message);
        this.setState({value: ''});
    }

    render() {
        return (
            <App submitForm = {this.submitForm}
                 handleInput = {this.handleInput}
                 value = {this.state.value}
                 message = {this.state.message} />
        );
    }
}

export default AppContainer;
