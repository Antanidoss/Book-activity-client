import React from 'react';
import { Link } from 'react-router-dom'
import { Menu } from "antd";
import {
    UserOutlined,
    BarChartOutlined,
    TeamOutlined,
    BookOutlined,
    LoginOutlined
} from "@ant-design/icons";
import { PropsType } from '../navbar/NavbarContainer';

const Navbar: React.FC<PropsType> = (props) => {
    return (
        <Menu theme="dark" mode="inline" style={{ alignContent: 'center' }}>
            {
                props.isAuthenticated
                    ? <Menu.Item key={1} icon={React.createElement(UserOutlined)} style={{ marginTop: "64px" }}><Link to="#">{props.userName}</Link></Menu.Item>
                    : <Menu.Item key={1} icon={React.createElement(LoginOutlined)} style={{ marginTop: "64px" }}><Link to="/login">LOGIN</Link></Menu.Item>
            }
            <Menu.Item key={2} icon={React.createElement(BookOutlined)}>
                <Link to="/activeBooks">ACTIVE BOOKS</Link>
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
    )
}

export default Navbar;