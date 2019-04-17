import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authStart=()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess=(token,auth)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        isAuth:auth
    }
}

export const authFail=(err)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        err:err
    }
}

export const logout=(token)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    return dispatch=>{
        axios.post('/logout',{
            headers: {"Authorization" : `Bearer ${token}`} })
        .then(res=>{
            dispatch (logOut_Reducer())
        })
        .catch(err=>{
            dispatch(authFail(err))
        })
    }
}

export const logOut_Reducer=()=>{
    return{
        type: actionTypes.LOG_OUT
    }
}

export const setTimeoutFn=()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const auth = (userName,email,password,isSignIn)=>{
    return dispatch =>{
        dispatch(authStart())
        const userData ={
            user:userName,
             email:email,
             pwd:password
        }
        
        let url = '/login';
        if(!isSignIn){
            url = '/register';
        }
        axios.post(url,userData)
        .then(res=>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('auth',res.data.auth)
            dispatch(authSuccess(res.data.token,res.data.auth))
        })
        .catch(err=>{
            dispatch(authFail(err.message))
        })
    }
}

export const autoSignupOnRefresh = ()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        const isAuth=localStorage.getItem('auth')

        if(!token || token==null){
            return;
        }
        else{
            console.log('in auto signup: ' , isAuth)
        // dispatch(meFromToken(token))
        axios.get('/refresh_token',
                   { headers: {"Authorization" : `Bearer ${token}`} }
                 )
            .then((res) => {
                console.log(res)
                if (!res.data.error) {
                    //store token 
                    localStorage.setItem('token', res.data.token);
                    dispatch(authSuccess(res.data.token,res.data.auth))
                } else {
                    //remove token from storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('isAuth');
                    // dispatch(authFail(error.message))
                }
            });
    }}
}