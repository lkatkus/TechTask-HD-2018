import React from 'react';

import Input from './Input/Input';

const form = (props) => {
    switch(props.type){
        case('login'):
            return (
                <React.Fragment>
                    <div>
                        <form onSubmit={props.onLogin}>
                            <Input elementType="Username"/>
                            <Input elementType="Password"/>
                            <Input elementType="Submit"/>
                        </form>
                    </div>
                </React.Fragment>
            );
        case('signup'):
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
        default:
            return null;
    }
};

export default form;