import * as actionTypes from '../actions/actionTypes';
const initialState = {
    error:null,
    loading:false,
    idToken:null,
    // authRedirectUrl:'/dashboard',
    isAuth:false
}

const authStart = (state,action)=>{
    return{
        ...state,
        loading:true,
        error:null
    }
}

const authSuccess = (state,action)=>{
    return{
        ...state,
        idToken:action.idToken,
        isAuth:action.isAuth,
        loading:false
    }
}

const authFail = (state,action)=>{
    return{
        ...state,
        loading:false,
        error:action.err  
    }
}

const logout = (state,action)=>{
    return{
        ...state,
        loading:false,
        error:null,
        idToken:null,
        isAuth:false
    }
}


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
        case actionTypes.AUTH_FAIL :     return authFail(state,action)
        case actionTypes.LOG_OUT : return logout(state,action)
        default: {return state}
    }
}

export default reducer;