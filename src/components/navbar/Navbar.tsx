import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Avatar, Menu, Image } from "antd";
import {
    UserOutlined,
    BarChartOutlined,
    TeamOutlined,
    BookOutlined,
    LoginOutlined
} from "@ant-design/icons";
import { PropsType } from '../navbar/NavbarContainer';

const Navbar: React.FC<PropsType> = (props) => {
    const location = useLocation();
    return (
        <Menu theme="dark" mode="inline" style={{ alignContent: 'center' }} selectedKeys={[location.pathname]}>
            {
                props.isAuthenticated
                    ? <Menu.SubMenu key="/userOptions" style={{ marginTop: "64px" }} title={props.userName}
                        icon={props.avatarImage !== null ? <Avatar><Image width={"32px"} src={("data:image/png;base64," + props.avatarImage)} /></Avatar> : <UserOutlined />}>
                        <Menu.Item key="/profile"><Link to="/profile">PROFILE</Link></Menu.Item>
                        <Menu.Item key="/administration"><Link to="/administration">ADMINISTRATION</Link></Menu.Item>
                    </Menu.SubMenu>
                    : <Menu.Item key={1} icon={React.createElement(LoginOutlined)} style={{ marginTop: "64px" }}><Link to="/login">LOGIN</Link></Menu.Item>
            }
            <Menu.Item key="/activeBooks" icon={React.createElement(BookOutlined)}>
                <Link to="/activeBooks">ACTIVE BOOKS</Link>
            </Menu.Item>
            <Menu.Item key="/books" icon={React.createElement(BookOutlined)}>
                <Link to={"/books"}>BOOKS</Link>
            </Menu.Item>
            <Menu.Item key="/statistic" icon={React.createElement(BarChartOutlined)}>
                <Link to="/statistic">STATISTICS</Link>
            </Menu.Item>
            <Menu.Item key="/users" icon={React.createElement(TeamOutlined)}>
                <Link to={"/users"}>OTHER READERS</Link>
            </Menu.Item>
        </Menu>
    )
}

export default Navbar;