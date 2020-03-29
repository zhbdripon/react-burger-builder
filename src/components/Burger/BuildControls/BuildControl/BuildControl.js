import React from 'react';
import classes from './BurgerControl.module.css'

const buildControl = () =>{
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less}>Less</button>
            <button className={classes.More}>More</button>
        </div>
    )
}

export default buildControl;