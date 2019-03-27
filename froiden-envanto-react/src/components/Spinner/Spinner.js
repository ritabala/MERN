import React from 'react';
import classes from './Spinner.css';
import Aux from '../Spinner/Spinner';

const spinner = () =>(
    <Aux className={classes.Loader}>Loading...</Aux>
)
export default spinner;