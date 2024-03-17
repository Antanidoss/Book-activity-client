import './App.css';
import React from 'react'
import AllBooksContainer from './components/books/AllBooksContainer'
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { siderStyles, bookActivityFontStyles } from './MainStyles';
import NavbarContainer from './components/navbar/NavbarContainer';
import LoginContainer from './components/account/login/LoginContainer';
import { AppStoreType } from './redux/redux-store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeThunkCreator } from './redux/reducers/app-reducer';
import { getInitialized } from './redux/selectors/app-selectors';
import AllCurUserActiveBooksContainer from './components/activeBook/AllActiveBooksCurUserContainer';
import AdministartionMain from './components/administration/AdministartionMain';
import RegistrationContainer from './components/account/registration/RegistrationContainer';
import ProfileContainer from './components/account/profile/ProfileContainer';
import ActiveBooksStatisticForCurUserContainer from './components/activeBooksStatistic/ActiveBooksStatisticForCurUserContainer';
import AllUsersContainer from './components/users/allUsers/AllUsersContainer';
import NotificationsContainer from './components/notifications/NotificationsContainer';
import BookInfoContainer from './components/books/bookInfo/BookInfoContainer';
import { ROUT_PAGE_NAME } from './types/constants';

const App: React.FC<PropsType> = (props) => {
    const { Sider, Content, Header } = Layout;

    if (!props.initialized) {
        props.initialize();
        return <></>;
    }

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>

            <Layout hasSider style={{ minHeight: "100%" }}>
                <Sider style={siderStyles}>
                    <NavbarContainer></NavbarContainer>
                </Sider>

                <Layout style={{ marginLeft: "200px" }}>
                    <Header>
                        <div style={bookActivityFontStyles}>Book activity</div>
                        <NotificationsContainer />
                    </Header>
                    <Content style={{ overflow: "initial", minHeight: "95vh" }}>
                        <Routes>
                            <Route path={ROUT_PAGE_NAME.ALL_BOOKS} element={<AllBooksContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_LOGIN} element={<LoginContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_REGISTRATION} element={<RegistrationContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS} element={<AllCurUserActiveBooksContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.ADMINISTRATION} element={<AdministartionMain />}></Route>
                            <Route path={ROUT_PAGE_NAME.USER_PROFILE} element={<ProfileContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC} element={<ActiveBooksStatisticForCurUserContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.ALL_USERS} element={<AllUsersContainer />}></Route>
                            <Route path={ROUT_PAGE_NAME.BOOK_INFO} element={<BookInfoContainer />}></Route>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

type MapStateToPropsType = {
    initialized: boolean,
}

type MapDispatchToPropsType = {
    initialize: typeof initializeThunkCreator
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    initialized: getInitialized(state),
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, { initialize: initializeThunkCreator }))(App)