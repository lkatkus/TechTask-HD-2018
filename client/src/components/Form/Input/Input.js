import React from 'react';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case('Username'):
            inputElement = (
                <React.Fragment>
                    <label>{props.elementType}</label>
                    <input type="text" placeholder="Username" name="username"/>
                </React.Fragment>
            );
            break;

        case('Password'):
            inputElement = (
                <React.Fragment>
                    <label>{props.elementType}</label>
                    <input type="password" placeholder="Password" name="password"/>
                </React.Fragment>
            );
            break;
        
        case('Email'):
            inputElement = (
                <React.Fragment>
                    <label>{props.elementType}</label>
                    <input type="email" placeholder="Email" name="email"/>
                </React.Fragment>
            );
            break;            

        case('Submit'):
            inputElement = <input type="submit" value="Submit"/>;
            break;
        
        default:
            inputElement = null;
    }

    return(
        <div>
            {inputElement}
        </div>
    );
};

export default input;