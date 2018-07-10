// Dependency imports
import React from 'react';
import {connect} from 'react-redux'

// Component imports
import * as actions from '../../store/actions/actions';

// Asset imports
import './Header.css'

// Component
const header = (props) => {
    
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUserId');
        localStorage.removeItem('userName');
        props.authRemove();
    }

    return(
        <div className="HeaderContainer">
            <div>
                Hello, {localStorage.getItem('userName')}!
            </div>

            <nav>
                <div onClick={logoutHandler}>Logout</div>
            </nav>
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(header);