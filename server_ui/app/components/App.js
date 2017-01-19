import React from 'react';
import io from 'socket.io-client';
import From from './Form';



//Did not test this



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
    }

    handleInput(e) {
        const value = e.target.value;
        this.setState({value: value});
    }

    submitForm(e) {
        e.preventDefault();
        //Send this.state.value to server
        this.setState({value: ''});
    }

    render() {
        return <Form handleSubmit = {this.submitForm}
        handleChange = {this.handleInput} />;
    }
}

export default App;
