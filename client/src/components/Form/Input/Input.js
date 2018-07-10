// Dependency imports
import React from 'react';

// Asset imports
import './Input.css';

// Component
const input = (props) => {

    switch(props.elementType){
        case('Username'):
            return <input type="text" placeholder="Username" name="username" required/>
        case('Password'):
            return <input type="password" placeholder="Password" name="password" required/>;
        case('Email'):
            return <input type="email" placeholder="Email" name="email"/>;
        case('Submit'):
            return <input type="submit" value="Submit"/>;
        default:
            return null;
    }
};

export default input;