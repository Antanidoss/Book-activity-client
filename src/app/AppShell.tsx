import React, { Suspense, useEffect, useState } from 'react';
import { Button, Drawer, Grid, Layout } from 'antd';
import { MenuOutlined, ReadOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';
import Navbar from 'components/navbar';
import Notifications from 'components/notifications';
import { CustomSpin } from 'commonComponents';
import {
  clearCurrentUser,
  commonSelectors,
  setCurrentUser,
  updateAppInitialized,
  useAppDispatch,
  useAppSelector,
} from 'store';
import { userApi } from 'api';
import { appRoutes } from './routes';
import styles from './AppShell.module.css';

const { Sider, Header, Content } = Layout;

export const AppShell: React.FC = () => {
  const initialized = useAppSelector(commonSelectors.initialized);
  const dispatch = useAppDispatch();
  const screens = Grid.useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = Boolean(screens.lg);

  useEffect(() => {
    if (initialized) {
      return;
    }

    userApi
      .getCurrentUser()
      .then((res) => {
        if (res.success && res.result) {
          dispatch(setCurrentUser(res.result));
          return;
        }

        dispatch(clearCurrentUser());
      })
      .catch(() => {
        dispatch(clearCurrentUser());
      })
      .finally(() => {
        dispatch(updateAppInitialized(true));
      });
  }, [dispatch, initialized]);

  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);

  if (!initialized) {
    return <CustomSpin loading />;
  }

  const navigation = <Navbar onNavigate={() => setMenuOpen(false)} />;

  return (
    <Layout className={styles.shell}>
      {isDesktop ? (
        <Sider width={280} className={styles.sidebar}>
          {navigation}
        </Sider>
      ) : (
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          placement="left"
          width={294}
          closable={false}
          className={styles.mobileDrawer}
        >
          {navigation}
        </Drawer>
      )}

      <Layout className={styles.contentLayout}>
        <Header className={styles.header}>
          <div className={styles.brandBlock}>
            {!isDesktop ? (
              <Button
                type="text"
                size="large"
                className={styles.mobileMenuButton}
                icon={<MenuOutlined />}
                onClick={() => setMenuOpen(true)}
              />
            ) : null}
            <div className={styles.brandMark}>
              <ReadOutlined />
            </div>
            <div>
              <h1 className={styles.brandTitle}>Book Activity</h1>
              <p className={styles.brandText}>
                Discover thoughtful reads, track progress, and stay connected with readers.
              </p>
            </div>
          </div>
          <Notifications />
        </Header>

        <Content className={styles.pageContent}>
          <div className={styles.pageInner}>
            <Suspense fallback={<CustomSpin loading />}>
              <Routes>
                {appRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
