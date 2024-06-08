import './App.css';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { siderStyles, bookActivityFontStyles } from './MainStyles';
import Navbar from './components/navbar';
import AdministartionMain from './components/administration/AdministartionMain';
import Login from './components/account/login';
import Registration from './components/account/registration';
import AllBooks from './components/books/allBooks';
import AllCurUserActiveBooks from './components/activeBook/allActiveBooks';
import Profile from './components/account/profile';
import ActiveBooksStatistic from './components/activeBooksStatistic';
import AllUsers from './components/users/allUsers';
import BookInfo from './components/books/bookInfo';
import Notifications from './components/notifications';
import { useSelector } from 'react-redux';
import { userApi } from 'api';
import { useDispatch } from 'react-redux';
import { setCurrentUser, updateAppInitialized, commonSelectors } from './redux';
import { ROUT_PAGE_NAME } from './common';

const App: React.FC = () => {
    const { Sider, Content, Header } = Layout;
    const initialize = useSelector(commonSelectors.initialized);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!initialize) {
            userApi.getCurrentUser().then(res => {
                dispatch(setCurrentUser(res.result));
                dispatch(updateAppInitialized(true));
            })
        }
    }, []);

    if (!initialize) return <></>;

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>

            <Layout hasSider style={{ minHeight: "100%" }}>
                <Sider style={siderStyles}>
                    <Navbar />
                </Sider>

                <Layout style={{ marginLeft: "200px" }}>
                    <Header>
                        <div style={bookActivityFontStyles}>Book activity</div>
                        <Notifications />
                    </Header>
                    <Content style={{ overflow: "initial", minHeight: "95vh" }}>
                        <Routes>
                            <Route path={ROUT_PAGE_NAME.ALL_BOOKS} element={<AllBooks />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_LOGIN} element={<Login />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_REGISTRATION} element={<Registration />}></Route>
                            <Route path={ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS} element={<AllCurUserActiveBooks />}></Route>
                            <Route path={ROUT_PAGE_NAME.ADMINISTRATION} element={<AdministartionMain />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_PROFILE} element={<Profile />}></Route>
                            <Route path={ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC} element={<ActiveBooksStatistic />}></Route>
                            <Route path={ROUT_PAGE_NAME.ALL_USERS} element={<AllUsers />}></Route>
                            <Route path={ROUT_PAGE_NAME.BOOK_INFO} element={<BookInfo />}></Route>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default App;