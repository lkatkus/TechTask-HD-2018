// Dependency imports
import React from 'react';

// Component imports
import Button from '../../../components/UI/Button/Button';

// Asset imports
import './Reminder.css';

// Component
const reminder = (props) => {
    return(
        <div className='reminderContainer'>
            <div className="reminderContent">
                <div className='reminderTitle'>
                    {props.title}
                </div>                
                <div className='reminderText'>
                    {props.text}
                </div>
            </div>
            <div className="reminderButtons">
                <Button small label='Update' clicked={() => props.updateReminder(props)}/>
                <Button small label='Delete' clicked={() => props.removeReminder(props._id)}/>
                <Button small label='Send' clicked={() => props.sendReminder(props)}/>               
            </div>
        </div>
    )
};

export default reminder;