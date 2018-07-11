// Dependency imports
import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Component imports
import Form from '../../components/Form/Form';
import * as actions from '../../store/actions/actions';

// Asset imports
import './Home.css'

// Component
class Home extends Component{

    state = {
        error: null
    }

    loginHandler = (event) => {
        event.preventDefault();

        let formData = {
            username: event.target.username.value.trim(),
            password: event.target.password.value.trim(),
        };

        axios.post('http://localhost:8000/user/login', formData)
        .then((res) => {
            if(res.data.token){
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('authUserId', res.data.id);
                localStorage.setItem('userName', res.data.name);
                this.props.authAdd();
                this.props.history.push('/reminders');
            }else{
                throw new Error(res.data);
            }
        })
        .catch((err) => {
            let errorMessage;
            if(err.response){
                errorMessage = err.response.data;
            }else{
                errorMessage = err.message;
            }
            this.setState({ error: errorMessage });
        });
    };

    createUserHandler = (event) => {
        event.preventDefault();

        let formData = {
            username: event.target.username.value.trim(),
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };

        axios.post('http://localhost:8000/user', formData)
        .then((res) => {
            if(res.data.error){
                throw new Error(res.data.error);
            }
            this.props.history.push('/');
        })
        .catch((err) => {
            let errorMessage;
            if(err.response){
                errorMessage = err.response.data;
            }else{
                errorMessage = err.message;
            }
            this.setState({ error: errorMessage });
        });
    };

    displayFormHandler = () => {
        if(this.props.status === 'login'){
            return <Form type='login' onLogin={this.loginHandler}/>;
        }else if(this.props.status === 'signup'){
            return <Form type='signup' onCreateUser={this.createUserHandler}/>;
        }
    };

    showError = () => {
        if(this.state.error){
            return <div className="errorContainer">{this.state.error}</div>
        }else{
            return null;
        }
    }

    render(){
        return(
            <div className='contentContainer'>
                <h1>RmbrApp</h1>
                {this.displayFormHandler()}
                {this.showError()}
            </div>
        )
    };
};

const mapStateToProps = state => {
    return{
        user: state.user,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        authAdd: () => dispatch(actions.authAdd()),
        authRemove: () => dispatch(actions.authRemove())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));