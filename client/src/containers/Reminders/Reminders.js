// Dependency imports
import React, {Component} from 'react';
import axios from 'axios';

import AddReminderControls from './AddReminder/AddReminder';

// Component
class Reminders extends Component {
    
    state = {
        reminders: null
    };

    componentDidMount(){
        // console.log('componentDidMount');

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.get(`http://localhost:8000/user/${userId}/reminder`, {'headers': {authToken: userToken}})
        .then((res) => {          
            this.setState({
                reminders: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    showReminders = () => {
        if(this.state.reminders){
            return this.state.reminders.map((reminder, i) => {
                return <p key={reminder._id}>reminder: {reminder.text}</p>
            })
        }
        return <p>Loading...</p>
    }

    addNewReminder = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.post(`http://localhost:8000/user/${userId}/reminder`, {text: event.target.reminderText.value}, {'headers': {authToken: userToken}})
        .then((res) => {
            this.setState({
                    reminders: res.data
                }
            );
        })
        .catch((err) => {
            console.log('err');
        });
    };

    render(){
        return(
            <div>
                <AddReminderControls addNewReminder={this.addNewReminder}/>
                <h3>Reminders:</h3>
                {this.showReminders()}
            </div>
        );
    };
};

export default Reminders;