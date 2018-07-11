// Dependency imports
import React from 'react';

// Asset imports
import './Button.css';

// Component
const button = (props) => {
    let styles = ['button']

    if(props.big){
        styles.push('big')
    }
    if(props.small){
        styles.push('small')
    }

    return(
        <div className={styles.join(' ')} onClick={props.clicked}>
            {props.label}
        </div>
    )
};

export default button;