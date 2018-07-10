// Dependency imports
import React from 'react';

// Component imports

// Asset imports


// Component
const addReminderControls = (props) => {

    return(
        <React.Fragment>
            <form onSubmit={props.addNewReminder}>
                <input type="text" id="reminderText"></input>
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
};

export default addReminderControls;