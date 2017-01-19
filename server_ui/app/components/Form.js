import React from 'react';

const Form = props => (
    <form onSubmit = {props.handleSubmit}>
    <label>Enter Routing
    <input type = "text"
    placeholder = "eg 2 4 3 1"
    onChange = {props.handleChange} /></label>
    <button>Route</button>
    </form>
);

export default Form;
