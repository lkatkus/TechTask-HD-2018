// Dependency imports
import React from 'react';

// Component imports
import FormLogin from './FormLogin/FormLogin';
import FormSignup from './FormSignup/FormSignup';

// Asset imports
import './Form.css';

// Component
const form = (props) => {
    switch(props.type){
        case('login'):
            return <FormLogin {...props}/>;
        case('signup'):
            return <FormSignup {...props}/>;
        default:
            return <FormSignup {...props}/>;
    }
};

export default form;