// Dependency imports
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

// Component imports
import Backdrop from '../UI/Backdrop/Backdrop';

// Asset imports
import './Form.css';

// Component
class Form extends Component{
    state = {
        currentReminder: null
    };
    
    componentWillMount(){
        this.setState({
            currentReminder: {
                id: this.props.id,
                title: this.props.title,
                text: this.props.text
            }
        });
    }

    changeHandler = (event) => {
        let updatedReminder = {...this.state.currentReminder};
        updatedReminder[event.target.name] = event.target.value;

        this.setState({
            currentReminder: updatedReminder
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.updateReminder(this.state.currentReminder)
    }

    render(){
        switch(this.props.type){
            case('login'):
                return(
                    <div>
                        <form onSubmit={this.props.onLogin} id="loginForm">
                            <input type="text" placeholder="Username" name="username" required/>
                            <input type="password" placeholder="Password" name="password" required/>
                            <button type="submit">Log In</button>
                        </form>
                        
                        <div className="helper">OR</div>
                            <NavLink className="signUpBtn"to='/signup'>Sign up</NavLink>
                    </div>
                )
            case('signup'):
                return(
                    <div>
                        <form onSubmit={this.props.onCreateUser}>
                            <input type="text" placeholder="Username" name="username" required/>
                            <input type="password" placeholder="Password" name="password" required/>
                            <input type="email" placeholder="Email" name="email" required/>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>                
                )
            case('addReminder'):
                return(
                    <div className='reminderUpdateFormContainer'>
                        <Backdrop show cancelForm={this.props.cancelForm}/>
                        <form onSubmit={this.props.addNewReminder}>
                            <input type="text" name="title" placeholder="Title" autoComplete='off' required/>
                            <input type="text" name="text" placeholder="Text" autoComplete='off' required/>
                            <button type="submit">Add Reminder</button>
                        </form>
                    </div>
                )
            case('updateReminder'):
                return(
                    <div className='reminderUpdateFormContainer'>
                        <Backdrop show cancelForm={this.props.cancelForm}/>
                        <form onSubmit={this.formSubmitHandler}>
                            <input onChange={this.changeHandler} name='title' type='text' value={this.state.currentReminder.title} autoComplete='off' required/>
                            <input onChange={this.changeHandler} name='text' type='text' value={this.state.currentReminder.text} autoComplete='off' required/>
                            <button type="submit">Update Reminder</button>
                        </form>
                    </div>
                )
            default:
                return null;
        }        
    }
};

export default Form;