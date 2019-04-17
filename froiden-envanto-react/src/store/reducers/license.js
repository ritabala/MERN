import * as actionTypes from '../actions/actionTypes';
const initialState = {
    error:null,
    loading:false,
    licenses:[],
    show:false,
    id:''
}

const fetchStart = (state,action)=>{
    return{
        ...state,
        loading:true,
        licenses:[]
        }
}

const fetchSuccess = (state,action)=>{
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
        error:action.err,
        licenses:[]  
    }
}

const updateLicenseStart =(state,action)=>{
    return{
        ...state,
        loading:true
    }
}

const updateLicenseSuccess =(state,action)=>{
    return {
        ...state,
        licenses: action.result,
        loading:false
    }
}
const updateLicenseFail =(state,action)=>{
    return{
        ...state,
        error:action.err,
        loading:false
    }
}

const deleteLicenseStart =(state,action)=>{
    return{
        ...state,
        loading:true
    }
}

const deleteLicenseSuccess =(state,action)=>{

    let arr = state.licenses.filter((p)=>{
        return p.id !== action.id
    })

    return {
        ...state,
        licenses: arr,
        err:false,
        loading:false
    }
}
const deleteLicenseFail =(state,action)=>{
    return{
        ...state,
        error:action.err,
        loading:false
        }
}

const showModal=(state,action)=>{
    return{
        ...state,
        show:true,
        id:action.id
    }
}
const cancelModal=(state,action)=>{
    return{
        ...state,
        show: false
    }
}

const addLicenseStart =(state,action)=>{
    return{
        ...state,
        loading:true
    }
}

const addLicenseSuccess =(state,action)=>{
    let arr = state.licenses;
    arr.push(action.newLicense)
    return {
        ...state,
        licenses: arr,
        err:false,
        loading:false
    }
}
const addLicenseFail =(state,action)=>{
    return{
        ...state,
        error:action.err,
        loading:false
        }
}


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.FETCH_START: return fetchStart(state,action)
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state,action)
        case actionTypes.FETCH_FAIL :     return fetchFail(state,action)
        case actionTypes.UPDATE_LICENSE_START : return updateLicenseStart(state,action)
        case actionTypes.UPDATE_LICENSE_SUCCESS:    return updateLicenseSuccess(state,action)
        case actionTypes.UPDATE_LICENSE_FAIL :  return updateLicenseFail(state,action)
        case actionTypes.DELETE_LICENSE_SUCCESS:    return deleteLicenseSuccess(state,action)
        case actionTypes.DELETE_LICENSE_START : return deleteLicenseStart(state,action)
        case actionTypes.DELETE_LICENSE_FAIL :  return deleteLicenseFail(state,action)
        case actionTypes.SHOW_MODAL : return showModal(state,action)
        case actionTypes.CANCEL_MODAL: return cancelModal(state,action)
        case actionTypes.ADD_LICENSE_SUCCESS:    return addLicenseSuccess(state,action)
        case actionTypes.ADD_LICENSE_START : return addLicenseStart(state,action)
        case actionTypes.ADD_LICENSE_FAIL :  return addLicenseFail(state,action)
        default: {return state}
    }
}

export default reducer;