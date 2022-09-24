import { Col, Tabs } from 'antd';
import React from 'react';
import AddAuthorContainer from './addAuthor/AddAuthorContainer';
import AddBookContainer from './addBook/AddBookContainer';

const AdministartionMain: React.FC = () => {
    return (
        <Col style={{marginLeft: "24px"}} span={24}>
            <Tabs size='large'>
                <Tabs.TabPane style={{fontSize: "25px"}} tab="ADD BOOK" key="1">
                    <AddBookContainer />
                </Tabs.TabPane>
                <Tabs.TabPane style={{fontSize: "25px"}} tab="EDIT BOOK" key="2">
                </Tabs.TabPane>
                <Tabs.TabPane style={{fontSize: "25px"}} tab="ADD AUTHOR" key="3">
                    <AddAuthorContainer />
                </Tabs.TabPane>
            </Tabs>
        </Col>
    )
}

export default AdministartionMain;