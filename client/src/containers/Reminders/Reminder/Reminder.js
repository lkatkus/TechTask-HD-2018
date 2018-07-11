// Dependency imports
import React from 'react';

// Component imports
import Button from '../../../components/UI/Button/Button';

// Asset imports
import './Reminder.css';

// Component
const reminder = (props) => {
    return(
        <div className="reminderContainer">
            <div>
                <div className="reminderTitle">
                    {props.title}
                </div>                
                <div className="reminderText">
                    {props.text}
                </div>
            </div>
            <div>
                <Button label='Update' clicked={() => props.updateReminder(props)}/>
                <Button label='Delete' clicked={() => props.removeReminder(props._id)}/>
                <Button label='Send' clicked={() => props.sendReminder(props)}/>               
            </div>
        </div>
    )
};

export default reminder;