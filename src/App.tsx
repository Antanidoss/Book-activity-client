import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { siderStyles, bookActivityFontStyles } from './MainStyles';
import { useSelector } from 'react-redux';
import { userApi } from 'api';
import { useDispatch } from 'react-redux';
import { setCurrentUser, updateAppInitialized, commonSelectors } from './store';
import { ROUT_PAGE_NAME } from 'common';
import loadable from '@loadable/component';

const App: React.FC = () => {
  const { Sider, Content, Header } = Layout;
  const initialize = useSelector(commonSelectors.initialized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialize) {
      userApi.getCurrentUser().then((res) => {
        dispatch(setCurrentUser(res.result));
        dispatch(updateAppInitialized(true));
      });
    }
  }, [dispatch]);

  if (!initialize) return <></>;

  const Navbar = loadable(() => import('components/navbar'));
  const Notifications = loadable(() => import('components/notifications'));
  const AllBooks = loadable(() => import('components/books/allBooks'));
  const Login = loadable(() => import('components/account/login'));
  const Registration = loadable(() => import('components/account/registration'));
  const AllCurUserActiveBooks = loadable(() => import('components/activeBook/allActiveBooks'));
  const AdministartionMain = loadable(() => import('components/administration'));
  const Profile = loadable(() => import('components/account/profile'));
  const ActiveBooksStatistic = loadable(() => import('components/activeBooksStatistic'));
  const AllUsers = loadable(() => import('components/users/allUsers'));
  const BookInfo = loadable(() => import('components/books/bookInfo'));

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />

      <Layout hasSider style={{ minHeight: '100%' }}>
        <Sider style={siderStyles}>
          <Navbar />
        </Sider>

        <Layout style={{ marginLeft: '200px' }}>
          <Header>
            <div style={bookActivityFontStyles}>Book activity</div>
            <Notifications />
          </Header>
          <Content style={{ overflow: 'initial', minHeight: '95vh' }}>
            <Routes>
              <Route path={ROUT_PAGE_NAME.ALL_BOOKS} element={<AllBooks />}></Route>
              <Route path={ROUT_PAGE_NAME.USER_LOGIN} element={<Login />}></Route>
              <Route path={ROUT_PAGE_NAME.USER_REGISTRATION} element={<Registration />}></Route>
              <Route
                path={ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS}
                element={<AllCurUserActiveBooks />}
              ></Route>
              <Route path={ROUT_PAGE_NAME.ADMINISTRATION} element={<AdministartionMain />}></Route>
              <Route path={ROUT_PAGE_NAME.USER_PROFILE} element={<Profile />}></Route>
              <Route
                path={ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC}
                element={<ActiveBooksStatistic />}
              ></Route>
              <Route path={ROUT_PAGE_NAME.ALL_USERS} element={<AllUsers />}></Route>
              <Route path={ROUT_PAGE_NAME.BOOK_INFO} element={<BookInfo />}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
