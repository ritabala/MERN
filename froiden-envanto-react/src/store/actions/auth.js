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

export const logOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    // return{
    //     type: actionTypes.LOG_OUT
    // }
    return dispatch=>{
        axios.post('/logout')
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
            // dispatch(authRedirectUrl('/dashboard'))
            // dispatch(setTimeoutFn())
        })
        .catch(err=>{
            dispatch(authFail(err.message))
        })
    }
}

// export const authRedirectUrl = (path)=>{
//     return ({
//         type: actionTypes.AUTH_REDIRECT_URL,
//         url:path
//     })
// }