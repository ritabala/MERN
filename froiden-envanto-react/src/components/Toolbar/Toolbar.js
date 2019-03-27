import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.css';
const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/* <SidebarToggle toggleSidebar={props.toggleSidebar}/> */}
            {/* <div className={classes.Logo}>
                <Logo/>
            </div> */}
            <nav className={classes.DesktopOnly}>
                <ul className={classes.xyz}>
                    <li className={classes.NavigationItem}>
                        {props.isAuth ? <NavLink to='/dashboard' exact activeClassName={classes.active}>Dashboard</NavLink>
                            : null}
                    </li>
                    <li className={classes.NavigationItem}>
                        {props.isAuth ?
                            <NavLink to='/licenses' exact activeClassName={classes.active}>License Management</NavLink>
                            : null}
                    </li>
                    <li className={classes.NavigationItem}>
                        {props.isAuth ? <NavLink to='/logout' exact activeClassName={classes.active}> Logout</NavLink>
                            : null}

                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default toolbar;