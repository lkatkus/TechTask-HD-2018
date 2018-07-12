// Dependency imports
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// Component imports
import Reminder from './Reminder/Reminder';
import Form from '../../components/Form/Form';
import Header from './Header/Header';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/actions';

// Asset imports
import './Reminders.css';
import {API_URL} from '../../config.js';

// Component
class Reminders extends Component {

    state = {
        updatingReminder: false,
        addingReminder: false,
        currentReminder: {}
    };

    componentDidMount(){
        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.get(`${API_URL}/user/${userId}/reminder`, {'headers': {authToken: userToken}})
        .then((res) => {          
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    showReminders = () => {
        if(this.props.reminders){
            return(
                this.props.reminders.map((reminder) => {
                    return(
                        <Reminder
                            {...reminder}
                            key={reminder._id}
                            removeReminder={this.removeReminder}
                            updateReminder={this.displayReminderUpdateForm}
                            sendReminder={this.sendReminder}
                        />
                    )
                })
            )
        }
        return <p>Loading...</p>
    };

    showReminderForm = () => {
        if(this.state.updatingReminder){
            return(
                <Form
                    type='updateReminder'
                    {...this.state.currentReminder}
                    updateReminder={this.updateReminder}
                    cancelForm={this.cancelForm}
                />
            )
        }else if(this.state.addingReminder){
            return(
                <Form
                    type='addReminder'
                    addNewReminder={this.addNewReminder}
                    cancelForm={this.cancelForm}
                />
            )
        }else{
            return null;
        }
    };

    displayAddReminderForm = () => {
        this.setState({
            addingReminder: true        
        }) 
    };

    displayReminderUpdateForm = (updatedReminder) => {
        this.setState({
            updatingReminder: true,
            currentReminder: {
                id: updatedReminder._id,
                title: updatedReminder.title,
                text: updatedReminder.text,
                deadline: updatedReminder.deadline
            }            
        });
    };

    cancelForm = () => {
        this.setState({
            updatingReminder: false,
            addingReminder: false,
            updatedReminder: null            
        })
    };

    getFilteredReminders = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.get(`${API_URL}/user/${userId}/reminder?to=${event.target.deadline.value}`, {'headers': {authToken: userToken}})
        .then((res) => {          
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    addNewReminder = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        let newReminder = {
            title: event.target.title.value.trim(),
            text: event.target.text.value.trim(),
            deadline: event.target.deadline.value
        };

        axios.post(`${API_URL}/user/${userId}/reminder`, newReminder, {'headers': {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
            this.cancelForm();
        })
        .catch((err) => {
            console.log('Unable to add a reminder');
        });
    };

    removeReminder = (reminderId) => {
        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.delete(`${API_URL}/user/${userId}/reminder/${reminderId}`, {headers: {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
            this.cancelForm();
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    };

    updateReminder = (reminder) => {

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        let updatedReminder = {
            title: reminder.title,
            text: reminder.text
        };
        
        axios.patch(`${API_URL}/user/${userId}/reminder/${reminder.id}`, updatedReminder, {headers: {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
            this.cancelForm();
        })
        .catch((err) => {
            console.log(err.response.data);
        });        
    };

    sendReminder = (reminderId) => {
        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.post(`${API_URL}/user/${userId}/reminder/${reminderId}/send`, null, {headers: {authToken: userToken}})
        .then((res) => {
            // Display confirmation message
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    };

    render(){
        return(
            <React.Fragment>
                
                <Header/>
                
                <div className='contentContainer'>
                    <Form type='filterReminders' filterReminder={this.getFilteredReminders}/>
                    <div className="contentContainerTitle">Do not forget to</div>
                    {this.showReminders()}
                    <Button big label='Add New Reminder' clicked={this.displayAddReminderForm}/>
                </div>

                {this.showReminderForm()}

            </React.Fragment>
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