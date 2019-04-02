import React from 'react';
import classes from './Modal.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../BackDrop/Backdrop';
const modal =(props)=>{
    return (
        <Aux>
            <Backdrop clicked={props.clicked} show={props.show}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show?'translateY(0)':'translateY(-100vh)',
                    opacity: props.show? '1':'0'
                }}
                > 
              {props.children}    
            </div>

        </Aux>
        // <div className={classes.modal}>
        //     {props.children}    
        // </div>
    )}

export default modal;