import * as actionTypes from './actionTypes';
import axios from 'axios';

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
        axios.get('http://localhost:4000/license?auth='+token)  
        .then(res=>{
            console.log(res.data)
            let licenseArray = [];
            for(let i in res.data){
                licenseArray.push({
                    ...res.data[i],
                    id:i
                })
            }
            console.log('Final ',licenseArray)
            dispatch(fetchSuccess(licenseArray))
        })
        .catch(err=>{
            dispatch(fetchFail(err))
        })
    }
}

