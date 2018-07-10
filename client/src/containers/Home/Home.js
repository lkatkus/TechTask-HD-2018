// Dependency imports
import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Component imports
import Reminders from '../Reminders/Reminders';
import Form from '../../components/Form/Form';
import * as actions from '../../store/actions/actions';

// Asset imports

// Component
class Home extends Component{

    componentWillMount(){
        // Check if user is logged in
        if(localStorage.getItem('authToken')){
            this.props.authAdd();
        }else{
            this.props.authRemove();
        }
    };


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
            }else{
                throw new Error(res.data);
            }
        })
        .catch((err) => {
            console.log(err.response.data);
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
            console.log(err.response.data);
        });
    };

    displayFormHandler = () => {
        if(!this.props.user.auth){
            return <Form style={{backgroundColor:'blue'}} type={this.props.status} onLogin={this.loginHandler} onLogout={this.logoutHandler} onCreateUser={this.createUserHandler}/>;
        }else{
            return <Reminders id={this.props.user.id}/>
        }
    };

    render(){
        return(
            <React.Fragment>
                {this.displayFormHandler()}
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));