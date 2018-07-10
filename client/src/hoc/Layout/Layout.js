// Dependency imports
import React from 'react';

// Component imports

// Asset imports
import './Layout.css'

// Component
const layout = (props) => {
    return(
            <div className="mainContainer">
                    {props.children}
            </div>
    );
};

export default layout;