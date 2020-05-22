import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

import {NavLink} from 'react-router-dom';

const logo = (props) => {
    return (
        <NavLink
            to="/"
        >
            <div className={classes.Logo}>
                <img src={burgerLogo} alt="MyBurger"/>
            </div>
        </NavLink>
    )
}

export default logo;