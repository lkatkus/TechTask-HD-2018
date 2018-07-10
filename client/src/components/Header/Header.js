// Dependency imports
import React from 'react';
import {NavLink} from 'react-router-dom';
// Component imports

// Asset imports


// Component
const header = (props) => {
    return(
        <React.Fragment>
            <nav>
                <NavLink to='/'>HOME</NavLink>
                <NavLink to='/signup'>SIGNUP</NavLink>
            </nav>
        </React.Fragment>
    );
};

export default header;