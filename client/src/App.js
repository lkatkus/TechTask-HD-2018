// Dependency imports
import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Component imports
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Reminders from './containers/Reminders/Reminders';
import * as actions from './store/actions/actions';

// Asset imports

// Component
class App extends Component {

    componentWillMount(){
        // Check if user is currently logged in
        if(localStorage.getItem('authToken')){
            this.props.authAdd();
            this.props.history.push('/reminders');
        }
    };

    checkAuth = () => {
        if(localStorage.getItem('authToken')){
            return <Reminders id={this.props.user.id}/>
        }else{
            return <Redirect to='/'/>
        }
    };

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/reminders" component={() => this.checkAuth()}/>
                    <Route path="/signup" render={() => <Home status="signup"/> }/>
                    <Route path="/" render={() => <Home status="login"/> }/>
                </Switch>
            </Layout>
        );
    };
};

const mapStateToProps = state => {
    return{
        user: state.user,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        authAdd: () => dispatch(actions.authAdd()),
        authRemove: () => dispatch(actions.authRemove())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
