// Dependency imports
import React from 'react';

// Component imports
import Input from '../Input/Input';

// Asset imports

// Component
const formSignup = (props) => {
    return (
        <React.Fragment>
            <div>
                <form onSubmit={props.onCreateUser}>
                    <Input elementType="Username"/>
                    <Input elementType="Password"/>
                    <Input elementType="Email"/>
                    <Input elementType="Submit"/>
                </form>
            </div>
        </React.Fragment>
    );
};

export default formSignup;