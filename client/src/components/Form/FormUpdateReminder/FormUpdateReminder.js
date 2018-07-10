// Dependency imports
import React from 'react';

// Component imports
import Input from '../Input/Input';
import Backdrop from '../../UI/Backdrop/Backdrop';

// Asset imports
import './FormUpdateReminder.css'

// Component
const formUpdateReminder = (props) => {
    return (
        <React.Fragment>
            <div className="reminderUpdateFormContainer">
                <Backdrop show cancelUpdate={props.cancelUpdate}/>
                <form onSubmit={props.updateReminder}>
                    <input onChange={props.changed} name="text" type="text" value={props.text}/>
                    <Input elementType="Submit"/>
                </form>
            </div>
        </React.Fragment>
    );
};

export default formUpdateReminder;