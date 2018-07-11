// Dependency imports
import React from 'react';

// Asset imports
import './Button.css';

// Component
const button = (props) => {
    return(
        <div onClick={props.clicked}>
            {props.label}
        </div>
    )
};

export default button;