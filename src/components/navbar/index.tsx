import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Image, MenuProps } from 'antd';
import { MenuClickEventHandler, MenuInfo } from 'rc-menu/lib/interface';
import {
  UserOutlined,
  BarChartOutlined,
  TeamOutlined,
  BookOutlined,
  LoginOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { userSelectors, useAppSelector } from 'store';
import { ROLE_NAME, ROUT_PAGE_NAME } from 'common';
import styles from './index.module.css';

type Props = {
  onNavigate?: () => void;
};

const Navbar: React.FC<Props> = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useAppSelector(userSelectors.curUser);

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
      type,
    } as MenuItem;
  }

  const onClickMenuItem = (info: MenuInfo) => {
    if (info.key !== location.pathname) {
      navigate(info.key);
      onNavigate?.();
    }
  };

  const items: MenuProps['items'] = [
    currentUser !== null
      ? getItem('Profile', ROUT_PAGE_NAME.USER_PROFILE, React.createElement(UserOutlined), onClickMenuItem)
      : getItem('Login', ROUT_PAGE_NAME.USER_LOGIN, React.createElement(LoginOutlined), onClickMenuItem),
    getItem('Library', ROUT_PAGE_NAME.ALL_BOOKS, React.createElement(HomeOutlined), onClickMenuItem),
    getItem(
      'Active Books',
      ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS,
      React.createElement(BookOutlined),
      onClickMenuItem,
    ),
    getItem(
      'Statistics',
      ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC,
      React.createElement(BarChartOutlined),
      onClickMenuItem,
    ),
    getItem(
      'Readers',
      ROUT_PAGE_NAME.ALL_USERS,
      React.createElement(TeamOutlined),
      onClickMenuItem,
    ),
    currentUser?.roles?.includes(ROLE_NAME.ADMIN)
      ? getItem(
          'Administration',
          ROUT_PAGE_NAME.ADMINISTRATION,
          React.createElement(SettingOutlined),
          onClickMenuItem,
        )
      : null,
  ];

  return (
    <div className={styles.nav}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Reading Hub</p>
        <h2 className={styles.title}>Shape a better reading routine.</h2>
        <p className={styles.description}>
          Browse books, keep your progress moving, and see what the community is reading.
        </p>
      </div>

      <div className={styles.profileCard}>
        {currentUser?.avatarImage ? (
          <Avatar size={52} className={styles.avatar}>
            <Image
              preview={false}
              width={52}
              height={52}
              className={styles.avatarImage}
              src={`data:image/png;base64,${currentUser.avatarImage}`}
            />
          </Avatar>
        ) : (
          <Avatar size={52} icon={<UserOutlined />} className={styles.avatar} />
        )}

        <div>
          <p className={styles.profileName}>{currentUser?.userName ?? 'Guest Reader'}</p>
          <p className={styles.profileMeta}>
            {currentUser ? 'Personal shelves, notes, and stats' : 'Sign in to save progress'}
          </p>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        className={styles.menu}
      />

      <div className={styles.footer}>
        A calmer, cleaner frontend shell with faster navigation and stronger visual hierarchy.
      </div>
    </div>
  );
};

export default Navbar;
