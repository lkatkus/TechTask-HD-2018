import * as actions from '../actionTypes';

export const authAdd = () => {
    console.log('authAdd');
    return{
        type: actions.AUTH_ADD
    };
};

export const authRemove = () => {
    console.log('authRemove');
    return{
        type: actions.AUTH_REMOVE
    };
};

export const addReminders = (reminders) => {
    console.log('authRemove');
    return{
        type: actions.ADD_REMINDERS,
        reminders
    };
};