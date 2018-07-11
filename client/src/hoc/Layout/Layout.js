// Dependency imports
import React from 'react';
import { withRouter } from 'react-router-dom'

// Asset imports
import './Layout.css'

// Component
const layout = (props) => {
    return (
        <div className="mainContainer">
            {props.children}
        </div>
    );
};

export default withRouter(layout);