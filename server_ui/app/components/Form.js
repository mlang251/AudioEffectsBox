import React from 'react';
import Radium from 'radium';

const Form = props => (
    <form onSubmit = {props.handleSubmit}>
        <label>Enter Routing
        <input type = "text"
               placeholder = "eg 2 4 3 1"
               value = {props.value}
               onChange = {props.handleChange}
               style = {styles.input} /></label>
        <button>Route</button>
    </form>
);

const styles = {
    input: {
        marginLeft: 5,
        marginRight: 5
    }
}

export default Radium(Form);
