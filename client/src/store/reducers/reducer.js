import * as actions from '../actionTypes';

const initialState = {
    user: {
        auth: false
    },
    reminders: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actions.AUTH_ADD):
            return{
                user: {
                    auth: true
                }
            }
        case(actions.AUTH_REMOVE):
            return{
                user: {
                    auth: false
                }                
            }
        case(actions.ADD_REMINDERS):
            return{
                ...state,
                reminders: action.reminders
            }
        default:
            return state;
    }
};

export default reducer;