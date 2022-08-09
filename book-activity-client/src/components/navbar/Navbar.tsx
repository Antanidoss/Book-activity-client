import React from 'react';
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>

            <div className={classes.navbar_main}>
                <NavLink className={classes.navbar_button} to='#'>HOME</NavLink>
                <NavLink className={classes.navbar_button} to='#'>BOOKS</NavLink>
                <NavLink className={classes.navbar_button} to='#'>FRIENDS</NavLink>
                <NavLink className={classes.navbar_button} to='#'>STATISTICS</NavLink>
                <NavLink className={classes.navbar_button} style={{ float: 'right' }} to='#'>ACCOUNT</NavLink>
            </div>
        </>
    )
}

export default Navbar;