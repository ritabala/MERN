import * as actionTypes from '../actions/actionTypes';
const initialState = {
    error:null,
    loading:false,
    licenses:null
}

const fetchStart = (state,action)=>{
    return{
        ...state,
        loading:true,
        error:null
    }
}

const fetchSuccess = (state,action)=>{
    console.log(action.licenses)
    return{
        ...state,
        licenses:action.licenses,
        loading:false
    }
}

const fetchFail = (state,action)=>{
    return{
        ...state,
        loading:false,
        error:action.err  
    }
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.FETCH_START: return fetchStart(state,action)
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state,action)
        case actionTypes.FETCH_FAIL :     return fetchFail(state,action)
        default: {return state}
    }
}

export default reducer;