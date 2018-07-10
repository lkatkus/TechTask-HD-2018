// Dependency imports
import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

// Component imports
import Reminders from '../Reminders/Reminders';
import Form from '../../components/Form/Form';

// Asset imports

// Component
class Home extends Component{
    state = {
        user: {
            auth: false,
        },
        error: false
    };

    componentWillMount(){
        // Check if user is logged in
        if(localStorage.getItem('authToken')){
            this.setState({
                user: {
                    auth: true,
                }
            });
        }else{
            this.setState({
                user: {
                    auth: false,
                }
            });
        }
        

        if(this.props.status === 'signup'){
            // console.log('ROUTE signup');
        }else{
            // console.log('ROUTE login');
        }
    }

    componentWillUpdate(){
        // console.log('componentWillUpdate');
        if(this.props.status === 'signup'){
            // console.log('ROUTE signup');
        }else{
            // console.log('ROUTE login');
        }

        if(localStorage.getItem('authToken')){
            // console.log('User is logged in');
        }else{
            // console.log('User is not logged in');
        }
    }

    componentDidUpdate(){
        // console.log('componentDidUpdate');
    }

    loginHandler = (event) => {
        event.preventDefault();

        let formData = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        axios.post('http://localhost:8000/user/login', formData)
        .then((res) => {
            if(res.data.token){
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('authUserId', res.data.id);
                this.setState({
                    user: {
                        auth: true,
                    }
                });
            }else{
                throw new Error(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    logoutHandler = () => {
        localStorage.removeItem('authToken');
        this.setState({
            user: {
                auth: false
            }
        });
    };

    createUserHandler = (event) => {
        event.preventDefault();

        let formData = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        axios.post('http://localhost:8000/user', formData)
        .then((res) => {
            if(res.data.error){
                throw new Error(res.data.error);
            }
            console.log('redir');
            this.props.history.push('/');
        })
        .catch((err) => {
            console.log('CATCH');
            console.log(err);
        });
    }

    displayFormHandler = () => {
        if(!this.state.user.auth){
            return <Form type={this.props.status} onLogin={this.loginHandler} onLogout={this.logoutHandler} onCreateUser={this.createUserHandler}/>;
        }else{
            return <Reminders id={this.state.user.id}/>
        }
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={this.logoutHandler}>Logout</button>
                {this.displayFormHandler()}
            </React.Fragment>
        )
    };
}

export default withRouter(Home);