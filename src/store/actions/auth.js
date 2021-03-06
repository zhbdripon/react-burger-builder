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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime)
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

                const idToken = response.data.idToken;
                const userId = response.data.localId;
                const expiresIn = response.data.expiresIn * 1000;
                const expirationDate = new Date((new Date().getTime() + expiresIn));

                localStorage.setItem('token', idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', userId);
                
                dispatch(authSuccess(idToken,userId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const currentDate = new Date();
            if (expirationDate < currentDate){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                const expiresIn = expirationDate.getTime() - currentDate.getTime();
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout(expiresIn));
            }

        }
    }
}