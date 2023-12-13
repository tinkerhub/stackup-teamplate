import actions from "./action-constants";

export const deleteContactAction = (payload) => {
    return(
        {
            type : actions.CONTACT_DELETE_START,
            payload : payload
        }
    );
}

export const editContactAction = (payload) => {
    return(
        {
            type : actions.EDIT_CONTACT_START,
            payload : payload
        }
    );
}

export const addContactAction = (payload) => {

    return(
        {
            type : actions.ADD_CONTACT_START,
            payload : payload
        }
    );
}

export const contactFetchAction = (payload) => {

    return(
        {
            type : actions.CONTACTS_FETCH_START,
            payload : payload
        }
    );
}

export const signUpAction = (payload) => {

    return(
        {
            type : actions.SIGNUP_START,
            payload : payload
        }
    );
}

export const loginAction = (payload) => {

    return(
        {
            type:actions.LOGIN_START,
            payload:payload
        }
    )
};

export const logoutAction = () => {

    return{
        type:actions.LOGOUT_START
    }
}