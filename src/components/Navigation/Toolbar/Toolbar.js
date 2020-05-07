import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/drawerToggle/DrawerToggle'

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
             <div className={classes.Logo}>
                <Logo/>
             </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
             </nav>
        </header>
    )
}

export default toolbar;