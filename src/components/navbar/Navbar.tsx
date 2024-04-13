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
import { ROLE_NAME, ROUT_PAGE_NAME } from '../../types/constants';

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
            const avatarImage = props.currentUser?.avatarImage !== null
                ? <Avatar><Image width={"32px"} src={("data:image/png;base64," + props.currentUser?.avatarImage)} /></Avatar>
                : <Avatar icon={React.createElement(UserOutlined)} />;

            return getItem(props.currentUser?.userName, "/userOptions", avatarImage, undefined, { marginTop: "64px" }, [
                getItem("PROFILE", ROUT_PAGE_NAME.USER_PROFILE, undefined, onClickMenuItem),
                props.currentUser?.roles?.includes(ROLE_NAME.ADMIN)
                    ? getItem("ADMINISTRATION", ROUT_PAGE_NAME.ADMINISTRATION, undefined, onClickMenuItem)
                    : null
            ]);
        }

        return getItem("LOGIN", "/login", React.createElement(LoginOutlined), onClickMenuItem, { marginTop: "64px" });
    }

    const items: MenuProps['items'] = [
        getProfileMenuItem(),
        getItem("ACTIVE BOOKS", ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS, React.createElement(BookOutlined), onClickMenuItem),
        getItem("BOOKS", ROUT_PAGE_NAME.ALL_BOOKS, React.createElement(BookOutlined), onClickMenuItem),
        getItem("STATISTICS", ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC, React.createElement(BarChartOutlined), onClickMenuItem),
        getItem("OTHER READERS", ROUT_PAGE_NAME.ALL_USERS, React.createElement(TeamOutlined), onClickMenuItem),
    ];

    return (
        <Menu theme="dark" mode="inline" style={{ alignContent: 'center' }} selectedKeys={[location.pathname]} items={items} />
    )
}

export default Navbar;