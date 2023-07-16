import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Menu, Image, MenuProps } from "antd";
import { MenuClickEventHandler, MenuInfo } from "rc-menu/lib/interface";
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
    const navigate = useNavigate();

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        onClick?: MenuClickEventHandler,
        style?: React.CSSProperties,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            onClick,
            style,
            children,
            label,
            type
        } as MenuItem;
    }

    const onClickMenuItem = (info: MenuInfo) => {
        if (info.key !== location.key) {
            return navigate(info.key);
        } 
    }

    const getProfileMenuItem = () => {
        if (props.isAuthenticated) {
            const avatarImage = props.avatarImage !== null
                ? <Avatar><Image width={"32px"} src={("data:image/png;base64," + props.avatarImage)} /></Avatar>
                : <UserOutlined />;

            return getItem(props.userName, "/userOptions", avatarImage, undefined, { marginTop: "64px" }, [
                getItem("PROFILE", "/profile", undefined, onClickMenuItem),
                getItem("ADMINISTRATION", "/administration", undefined, onClickMenuItem)
            ]);
        }

        return getItem("LOGIN", "/login", undefined, LoginOutlined, { marginTop: "64px" });
    }

    const items: MenuProps['items'] = [
        getProfileMenuItem(),
        getItem("ACTIVE BOOKS", "/activeBooks", <BookOutlined />, onClickMenuItem),
        getItem("BOOKS", "/books", <BookOutlined />, onClickMenuItem),
        getItem("STATISTICS", "/statistic", <BarChartOutlined />, onClickMenuItem),
        getItem("OTHER READERS", "/users", <TeamOutlined />, onClickMenuItem),
    ];

    return (
        <Menu theme="dark" mode="inline" style={{ alignContent: 'center' }} selectedKeys={[location.pathname]} items={items} />
    )
}

export default Navbar;