import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = ()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email,password,isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC01VyU5EuO85e4EJn0jglUAjybTj-zP_Q'
        if(isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC01VyU5EuO85e4EJn0jglUAjybTj-zP_Q';
        
        axios.post(url,authData)
            .then(response=>{
                console.log(response.data);
                const idToken = response.data.idToken;
                const userId = response.data.localId;
                const expiresIn = response.data.expiresIn;
                dispatch(authSuccess(idToken,userId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })
    }
} 