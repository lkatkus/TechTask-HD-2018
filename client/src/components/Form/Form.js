// Dependency imports
import React from 'react';
import {NavLink} from 'react-router-dom';

// Component imports
import Backdrop from '../UI/Backdrop/Backdrop';

// Asset imports
import './Form.css';

// Component
const form = (props) => {
    switch(props.type){
        case('login'):
            return(
                <div>
                    <form onSubmit={props.onLogin}>
                        <input type="text" placeholder="Username" name="username" required/>
                        <input type="password" placeholder="Password" name="password" required/>
                        <input type='submit' value='Log in'/>
                    </form>
                    <div>OR</div>
                    <NavLink className="signupButton" to='/signup'>Sign up</NavLink>
                </div>
            )
        case('signup'):
            return(
                <div>
                    <form onSubmit={props.onCreateUser}>
                        <input type="text" placeholder="Username" name="username" required/>
                        <input type="password" placeholder="Password" name="password" required/>
                        <input type="email" placeholder="Email" name="email" required/>
                        <input type='submit' value='Sign up'/>
                    </form>
                </div>                
            )
        case('addReminder'):
            return(
                <div className='reminderUpdateFormContainer'>
                    <Backdrop show cancelForm={props.cancelForm}/>
                    <form onSubmit={props.addNewReminder}>
                        <input type="text" name="title" placeholder="Title" required/>
                        <input type="text" name="text" placeholder="Text" required/>
                        <input type='submit' value='Add Reminder'/>
                    </form>
                </div>
            )
        case('updateReminder'):
            return(
                <div className='reminderUpdateFormContainer'>
                    <Backdrop show cancelForm={props.cancelForm}/>
                    <form onSubmit={props.updateReminder}>
                        <input onChange={props.changed} name='text' type='text' value={props.title} autoComplete='off' required/>
                        <input onChange={props.changed} name='text' type='text' value={props.text} autoComplete='off' required/>
                        <input type='submit' value='Update Reminder'/>
                    </form>
                </div>
            )
        default:
            return null;
    }
};

export default form;