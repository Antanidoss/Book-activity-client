import React from 'react';
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>

            <div className={classes.navbar_main}>
                <Link className={classes.navbar_button} to='#'>HOME</Link>
                <Link className={classes.navbar_button} to='/books'>BOOKS</Link>
                <Link className={classes.navbar_button} to='#'>FRIENDS</Link>
                <Link className={classes.navbar_button} to='#'>STATISTICS</Link>
                <Link className={classes.navbar_button} style={{ float: 'right' }} to='#'>ACCOUNT</Link>
            </div>
        </>
    )
}

export default Navbar;