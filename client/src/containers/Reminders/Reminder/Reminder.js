// Dependency imports
import React from 'react';

// Asset imports
import './Reminder.css';

// Component
const reminder = (props) => {
    return(
        <div className="reminderContainer">
            <div>
                {props.text}
            </div>
            <div className="deleteBtn" onClick={() => props.removeReminder(props._id)}>
                Delete
            </div>
            <div className="updateBtn" onClick={() => props.startUpdating(props)}>
                Update
            </div>
        </div>
    )
};

export default reminder;