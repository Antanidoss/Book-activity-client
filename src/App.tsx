import './App.css';
import React, {useEffect} from 'react'
import AllBooksContainer from './components/books/AllBooksContainer'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { siderStyles, bookActivityFontStyles } from './MainStyles';
import NavbarContainer from './components/navbar/NavbarContainer';
import LoginContainer from './components/account/login/LoginContainer';
import { AppStoreType } from './redux/redux-store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeThunkCreator } from './redux/app-reducer';
import { getInitialized } from './redux/app-selectors';
import AllCurUserActiveBooksContainer from './components/activeBook/AllActiveBooksCurUserContainer';
import AdministartionMain from './components/administration/AdministartionMain';
import RegistrationContainer from './components/account/registration/RegistrationContainer';
import ProfileContainer from './components/account/profile/ProfileContainer';
import ActiveBooksStatisticForCurUserContainer from './components/activeBooksStatistic/ActiveBooksStatisticForCurUser/ActiveBooksStatisticForCurUserContainer';
import AllUsersContainer from './components/users/allUsers/AllUsersContainer';

const App: React.FC<PropsType> = (props) => {
    const { Sider, Content, Header } = Layout;

    useEffect(()=>{
        if (!props.initialized)
            props.initialize();
    })

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>

            <Layout hasSider style={{minHeight: "100%"}}>
                <Sider style={siderStyles}>
                    <NavbarContainer></NavbarContainer>
                </Sider>

                <Layout style={{ marginLeft: "200px" }}>
                    <Header>
                        <div style={bookActivityFontStyles}>Book activity</div>
                        <div style={{ float: "right" }}>
                            <Link to="#" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                <NotificationOutlined />
                            </Link>
                        </div>
                    </Header>
                    <Content style={{ overflow: "initial", minHeight: "95vh"}}>
                        <Routes>
                            <Route path="/books" element={<AllBooksContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/login" element={<LoginContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/registration" element={<RegistrationContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/activeBooks" element={<AllCurUserActiveBooksContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/administration" element={<AdministartionMain />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/profile" element={<ProfileContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/statistic" element={<ActiveBooksStatisticForCurUserContainer />}></Route>
                        </Routes>
                        <Routes>
                            <Route path="/users" element={<AllUsersContainer />}></Route>
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
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, {initialize: initializeThunkCreator}))(App)