import actions from "./action-constants";

export const studentDataAction = (payload) => {

    return(
        {
            type : actions.STUDENT_DATA_START,
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