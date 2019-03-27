import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Toolbar/Toolbar';
import classes from './Layout.css';
const layout = (props)=>{
    return(
        <Aux>
            <Toolbar isAuth={props.isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;