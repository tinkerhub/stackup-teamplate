import actions from "../../actions/action-constants";

let initState = {
    login:false
};

const userReducer = (state=initState,action) =>
{
    switch(action.type)
    {
        case actions.ADD_CONTACT_SUCCESS:
            return{
                ...state,
                contact_add : true
            }
        case actions.ADD_CONTACT_FAILED:
            return{
                ...state,
                contact_add: false
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                login:true
            }
        case actions.LOGIN_FAILED:
            return{
                ...state,
                user : action.payload,
                login:false
            }
        case actions.LOGOUT_SUCCESS:
            return{
                login:false
            }
        case actions.SIGNUP_SUCCESS:
            return{
                ...state,
                user : action.payload,
                login : true,
                message : "success"
            }
        case actions.SIGNUP_FAILED:
            return{
                ...state,
                message : action.payload.message,
                login:false
            }
        case actions.CONTACTS_FETCH_SUCCESS:
            return{
                ...state,
                contacts : action.payload.contacts
            }
        case actions.CONTACTS_FETCH_FAILED:
            return {
                ...state,
                contacts : null,
                message : "contacts fetch failed"
            }
        default:
            return state;
    }
}

export default userReducer;