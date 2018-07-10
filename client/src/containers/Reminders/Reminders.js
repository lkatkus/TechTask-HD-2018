// Dependency imports
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// Component imports
import Reminder from './Reminder/Reminder';
import Header from '../../components/Header/Header';
import AddReminderControls from './AddReminder/AddReminder';
import * as actions from '../../store/actions/actions';

// Component
class Reminders extends Component {

    componentDidMount(){
        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.get(`http://localhost:8000/user/${userId}/reminder`, {'headers': {authToken: userToken}})
        .then((res) => {          
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    showReminders = () => {
        if(this.props.reminders){
            return this.props.reminders.map((reminder) => {
                return(
                    <Reminder
                        {...reminder}
                        key={reminder._id}
                    />
                )
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
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log('err');
        });
    };

    render(){
        return(
            <div>
                <Header/>
                <AddReminderControls addNewReminder={this.addNewReminder}/>
                <div>
                    <h3>Reminders:</h3>
                    {this.showReminders()}
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        user: state.user,
        reminders: state.reminders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addReminders: (reminders) => dispatch(actions.addReminders(reminders)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);