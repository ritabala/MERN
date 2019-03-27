import React from 'react';
const toolbar = (props)=>{
    switch(props.type){
        case 'input' : 
            inputElement = <input />
            break;    
        
        default:
            inputElement = <input {...props}/>
            break;     
        
    }
    return(
        {
           
        }
    )
}
 
export default toolbar;