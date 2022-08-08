import React from 'react';
import classes from './Navbar.module.css'

const Navbar = () => {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>

            <div className={classes.navbar_main}>
                <a className={classes.navbar_button} href='#'>HOME</a>
                <a className={classes.navbar_button} href='#'>MY BOOKS</a>
                <a className={classes.navbar_button} href='#'>MY FRIENDS</a>
                <a className={classes.navbar_button} href='#'>STATISTICS</a>
                <a className={classes.navbar_button} style={{float: 'right'}} href='#'>ACCOUNT</a>
            </div>
        </>
    )
}

export default Navbar;