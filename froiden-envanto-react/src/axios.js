import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:4000'
});

// instance.interceptors.request.use(req=>{
//     console.log(req);
//     return request;
// })
 

export default instance;