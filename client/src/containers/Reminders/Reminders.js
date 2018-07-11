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

// Component
class Reminders extends Component {

    state = {
        updatingReminder: false,
        addingReminder: false,
        currentReminder: {}
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
    }

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
            updatedReminder: {
                id: updatedReminder._id,
                title: updatedReminder.title,
                text: updatedReminder.text
            }            
        }) 
    };


    cancelForm = () => {
        this.setState({
            updatingReminder: false,
            addingReminder: false,
            updatedReminder: null            
        })
    };

    addReminder = (event) => {
        event.preventDefault();

        let userId = localStorage.getItem('authUserId');
        let userToken = localStorage.getItem('authToken');

        let newReminder = {
            title: event.target.title.value.trim(),
            text: event.target.text.value.trim()
        }

        axios.post(`http://localhost:8000/user/${userId}/reminder`, newReminder, {'headers': {authToken: userToken}})
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
            this.setState({
                updateReminder: false,
                updatedReminder: null            
            })
        })
        .catch((err) => {
            console.log(err.response.data);
        });        
    }

    sendReminder = (reminder) => {
        console.log('Sending reminder');
    }

    render(){
        return(
            <React.Fragment>
                
                <Header/>
                
                <div className='contentContainer'>
                    <h3>Reminders:</h3>
                    {this.showReminders()}
                    <Button label='Add New Reminder' clicked={this.displayAddReminderForm}/>
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