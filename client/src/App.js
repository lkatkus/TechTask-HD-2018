// Dependency imports
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

// Component imports
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Reminders from './containers/Reminders/Reminders';

// Asset imports

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/user/:id/reminder" component={Reminders}/>
                    <Route path="/signup" exact render={() => <Home status="signup" /> }/>
                    <Route path="/" exact render={() => <Home status="login" /> }/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
