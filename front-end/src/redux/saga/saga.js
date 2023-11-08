import {put,takeEvery,all,call, takeLatest} from 'redux-saga/effects';
import actions from '../actions/action-constants';

const LoginValidation = (data) => {

    const userData = {
        username:data.email,
        password:data.password
    }

    return fetch('http://localhost:5000/api/user/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        console.log(error)
    })
}

const SignUp = (data) => {

    const user = {
        name : data.name,
        username : data.username,
        email : data.email,
        password : data.password
    }

    return fetch('http://localhost:5000/api/user/signup',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(user)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        console.log(error)
    })
}

const getContacts = (id) => {

    const user = {
        id : id
    }
    return fetch('http://localhost:5000/api/user/get-contacts',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(user)
    })
    .then(async res =>
        {
            res = await res.json();
            return res;
        })
    .catch(error => {
        console.log(error)
    })
}

const deleteContact = (data) => {
    
    const info = {
        userId : data.id,
        contact : contact.id
    }
}

function* handleloginStart(action){

    try{ 
        const res = yield call(LoginValidation,action.payload);
        
        if(res.success)
        {
            yield put({type:actions.LOGIN_SUCCESS,payload:res.user});
        }
        else
        {
            return put({type:actions.LOGIN_FAILED,payload:res})
        }
    }
    catch(err){
        console.log(err);
    }
}

function* handleLogOut(){
    try
    {
        yield put({type : actions.LOGOUT_SUCCESS});
    }
    catch(err)
    {
        console.log("LOGOUT SAGA ERROR : ",err.message);
    }
}

function* handleSignUp(action){

    try{ 
        const res = yield call(SignUp,action.payload);

        console.log("signup response",res);
        
        if(res.success)
        {
            yield put({type:actions.SIGNUP_SUCCESS,payload:res.user});
        }
        else
        {
            yield put({type:actions.SIGNUP_FAILED,payload:res})
        }
    }
    catch(err){
        console.log(err);
    }

}

function* handleContactsFetch(action){
    try{ 
        const res = yield call(getContacts,action.payload.id);

        console.log("signup response",res);
        
        if(res.success)
        {
            yield put({type:actions.CONTACTS_FETCH_SUCCESS,payload:res.contacts});
        }
        else
        {
            yield put({type:actions.CONTACTS_FETCH_FAILED,payload:res})
        }
    }
    catch(err){
        console.log(err);
    }
}

function* handleContactDelete(action)
{
    try{ 
        const res = yield call(deleteContact,action.payload);

        console.log("signup response",res);
        
        if(res.success)
        {
            yield put({type:actions.CONTACT_DELETE_SUCCESS,payload:res});
        }
        else
        {
            yield put({type:actions.CONTACT_DELETE_FAILED,payload:res})
        }
    }
    catch(err){
        console.log(err);
    }
}

function* watchForLoginStart(){
    yield takeLatest(actions.LOGIN_START,handleloginStart);
}

function* watchForLogOutStart(){
    yield takeLatest(actions.LOGOUT_START,handleLogOut);
}

function* watchForSignUpStart(){
    yield takeLatest(actions.SIGNUP_START,handleSignUp);
}

function* watchForContactsFetch(){
    yield takeLatest(actions.CONTACTS_FETCH_START,handleContactsFetch)
}

function* watchForContactDelete(){
    yield takeLatest(actions.CONTACT_DELETE_START,handleContactDelete)
}

export default function* rootSaga()
{
    yield all(
        [
            watchForLoginStart(),
            watchForLogOutStart(),
            watchForSignUpStart(),
            watchForContactsFetch()
    ]);
}