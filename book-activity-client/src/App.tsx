import './App.css';
import React, { CSSProperties } from 'react'
import Navbar from './components/navbar/Navbar'
import AllBooksContainer from './components/books/AllBooksContainer'
import { Link, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

const App: React.FC = () => {
    const { Sider, Content, Header } = Layout;

    const siderStyles: CSSProperties = {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0
    }

    const bookActivityFontStyles: CSSProperties = {
        display: "inline",
        fontFamily: "Pacifico, cursive",
        fontSize: "30px",
        color: "white"
    }

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>

            <Layout hasSider>
                <Sider style={siderStyles}>
                    <Navbar></Navbar>
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
                    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                        <Routes>
                            <Route path="/books" element={<AllBooksContainer />}></Route>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default App;