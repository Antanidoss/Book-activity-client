import React from 'react';
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { Menu } from "antd";
import {
    UserOutlined,
    BarChartOutlined,
    TeamOutlined,
    BookOutlined
} from "@ant-design/icons";

const Navbar = () => {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            
            <Menu theme="dark" mode="inline" style={{ alignContent: 'center' }}>
                <Menu.Item key={1} icon={React.createElement(UserOutlined)} style={{ marginTop: "64px" }}>
                    <Link to="#">USER NAME</Link>
                </Menu.Item>
                <Menu.Item key={2} icon={React.createElement(BookOutlined)}>
                    <Link to="#">MY ACTIVE BOOKS</Link>
                </Menu.Item>
                <Menu.Item key={3} icon={React.createElement(BookOutlined)}>
                    <Link to={"/books"}>BOOKS</Link>
                </Menu.Item>
                <Menu.Item key={4} icon={React.createElement(BarChartOutlined)}>
                    <Link to="#">STATISTICS</Link>
                </Menu.Item>
                <Menu.Item key={5} icon={React.createElement(TeamOutlined)}>
                    <Link to={"#"}>FRIENDS</Link>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default Navbar;