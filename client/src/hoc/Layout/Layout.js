// Dependency imports
import React from 'react';

// Component imports
import Header from '../../components/Header/Header';

// Asset imports


// Component
const layout = (props) => {
    return(
        <React.Fragment>
            <Header/>
            {props.children}
        </React.Fragment>
    );
};

export default layout;