import * as actions from '../actionTypes';

export const authAdd = () => {
    return{
        type: actions.AUTH_ADD
    };
};

export const authRemove = () => {
    return{
        type: actions.AUTH_REMOVE
    };
};

export const addReminders = (reminders) => {
    return{
        type: actions.ADD_REMINDERS,
        reminders
    };
};