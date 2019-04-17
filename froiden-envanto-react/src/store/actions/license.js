import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { logout } from './auth';

export const fetchStart=()=>{
    return{
        type: actionTypes.FETCH_START
    }
}

export const fetchSuccess=(licenseArray)=>{
    return{
        type: actionTypes.FETCH_SUCCESS,
        licenses: licenseArray
    }
}

export const fetchFail=(err)=>{
    return{
        type: actionTypes.FETCH_FAIL,
        err:err
    }
}


export const fetchAllLicenses = (token)=>{
    return dispatch =>{
        dispatch(fetchStart())
        console.log(token)
        axios.get('/license',{
            headers: {"Authorization" : `Bearer ${token}`} })
        .then(res=>{
            console.log(res.data)
            if(res.data.error){

                dispatch(logout())
            }
            let licenseArray = [];
                for (let i in res.data) {
                    licenseArray.push({
                        ...res.data[i]
                    })
            }
            dispatch(fetchSuccess(licenseArray))

        })
        .catch(err=>{
            console.log(err)
            dispatch(fetchFail(err))
        })
    }
}

export const fetchOneLicense =(token,id)=>{
    return dispatch=>{
        dispatch(fetchStart());
        
        axios.get('/license/'+id,{
            headers: {"Authorization" : `Bearer ${token}`} })
        .then(res=>{
            // console.log('in fetch one ',res.data)
            if(res.data.error){
                dispatch(logout())
            }
            dispatch(fetchSuccess(res.data))
        })
        .catch(err=>{
            dispatch(fetchFail(err))
        })
    }
}

export const updateLicenseStart =()=>{
    return({
        type : actionTypes.UPDATE_LICENSE_START
    })
}

export const updateLicenseSuccess=(data)=>{
    return({
        type: actionTypes.UPDATE_LICENSE_SUCCESS,
        result:data
    })
}

export const updateLicenseFail =(err)=>{
    return({
        type:actionTypes.UPDATE_LICENSE_FAIL,
        err:err
    })
}


export const updateLicense = (token,id,newVal)=>{
    return dispatch=>{
        dispatch(updateLicenseStart());
        axios.post('/license/'+id,newVal,{
            headers:{"Authorization" : `Bearer ${token}`}})
        .then(res=>{
            // console.log(newVal)
            if(res.data.error){
                dispatch(logout())
            }
            let arr =[];
            arr.push(newVal);
            dispatch(updateLicenseSuccess(arr))
        })
        .catch(err=>{
             dispatch(updateLicenseFail(err));
        })    
        }
}

export const deleteLIcenseStart = ()=>{
    return{
        type:actionTypes.DELETE_LICENSE_START
    }
}

export const deleteLicenseSuccess = (id)=>{
    return{
        type:actionTypes.DELETE_LICENSE_SUCCESS,
        id:id
    }
}

export const deleteLicenseFail = (err)=>{
    return{
        type:actionTypes.DELETE_LICENSE_FAIL,
        err:err
    }
}

export const deleteLicense =(token,id)=>{
    return dispatch =>{
        dispatch(deleteLIcenseStart())
        axios.delete('/license/'+id,{
            headers:{"Authorization": `Bearer ${token}`}
        })
        .then(res=>{
            console.log(res.data)
            if(res.data.error){
                dispatch(logout())
            }
            dispatch(deleteLicenseSuccess(id))
        })
        .catch(err=>{
            console.log(err)
            dispatch(deleteLicenseFail(err))
        })
    }
}

export const showModal=(id)=>{
    return{
        type:actionTypes.SHOW_MODAL,
        id:id
    }
}

export const cancelModal=(id)=>{
    return{
        type:actionTypes.CANCEL_MODAL,
    }
}

export const addLicenseStart = ()=>{
    return{
        type:actionTypes.ADD_LICENSE_START
    }
}

export const addLicenseSuccess = (newLicense)=>{
    return{
        type:actionTypes.ADD_LICENSE_SUCCESS,
        newLicense:newLicense
    }
}

export const addLicenseFail = (err)=>{
    return{
        type:actionTypes.ADD_LICENSE_FAIL,
        err:err
    }
}

export const addLicense =(token,newLicense)=>{
    return dispatch =>{
        dispatch(addLicenseStart())
        axios.post('/license/',newLicense,{
            headers:{"Authorization": `Bearer ${token}`}
        })
        .then(res=>{
            if(res.data.error){
                dispatch(logout())
            }
            newLicense.id = res.data.insertId
            dispatch(addLicenseSuccess(newLicense))
        })
        .catch(err=>{
            dispatch(addLicenseFail(err))
        })
    }
}