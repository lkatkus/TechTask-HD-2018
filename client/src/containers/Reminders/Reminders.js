// Dependency imports
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// Component imports
import Reminder from './Reminder/Reminder';
import ReminderUpdateForm from '../../components/Form/FormUpdateReminder/FormUpdateReminder';
import Header from '../../components/Header/Header';
import AddReminderControls from './AddReminder/AddReminder';
import * as actions from '../../store/actions/actions';

// Component
class Reminders extends Component {

    state = {
        updateReminder: false,
        updatedReminder: null
    }

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
                        removeReminder={this.removeReminder}
                        startUpdating={this.startUpdating}
                    />
                )
            })
        }
        return <p>Loading...</p>
    }

    showUpdateForm = () => {
        if(this.state.updateReminder){
            return(
                <ReminderUpdateForm
                    {...this.state.updatedReminder}
                    cancelUpdate={this.cancelUpdate}
                    updateReminder={this.updateReminder}
                    changed={this.inputChangeHandler}
                />
            )
        }else{
            return null;
        }
    };

    inputChangeHandler = (event) =>{
        let newReminder = {...this.state.updatedReminder}
        newReminder.text = event.target.value
        this.setState({
            updatedReminder: newReminder
        })
    }

    startUpdating = (updatedReminder) => {
        this.setState({
            updateReminder: true,
            updatedReminder: {
                id: updatedReminder._id,
                text: updatedReminder.text
            }            
        }) 
    };

    cancelUpdate = () => {
        this.setState({
            updateReminder: false,
            updatedReminder: null            
        })
    };

    addReminder = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.post(`http://localhost:8000/user/${userId}/reminder`, {text: event.target.reminderText.value.trim()}, {'headers': {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log('Unable to add a reminder');
        });
    };

    removeReminder = (id) => {
        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.delete(`http://localhost:8000/user/${userId}/reminder/${id}`, {headers: {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }

    updateReminder = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        axios.patch(`http://localhost:8000/user/${userId}/reminder/${this.state.updatedReminder.id}`, {text: this.state.updatedReminder.text}, {headers: {authToken: userToken}})
        .then((res) => {
            this.props.addReminders(res.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        });        
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                
                <AddReminderControls addNewReminder={this.addReminder}/>
                
                <div>
                    <h3>Reminders:</h3>
                    {this.showReminders()}
                </div>
                
                {this.showUpdateForm()}
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