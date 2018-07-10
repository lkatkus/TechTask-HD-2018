// Dependency imports
import React from 'react';
import {NavLink} from 'react-router-dom';

// Component imports
import Input from '../Input/Input';

// Asset imports

// Component
const formLogin = (props) => {
    return (
        <React.Fragment>
            <div>
                <form onSubmit={props.onLogin}>
                    <Input elementType="Username"/>
                    <Input elementType="Password"/>
                    <Input elementType="Submit"/>
                </form>
                
                <div className="test">OR</div>
                
                <NavLink className="signupButton" to='/signup'>Sign up</NavLink>
            </div>
        </React.Fragment>
    );
};

export default formLogin;