import { Col, Tabs } from 'antd';
import React from 'react';

const AdministartionMain: React.FC = () => {
    return (
        <Col style={{marginLeft: "24px"}} span={24}>
            <Tabs size='large'>
                <Tabs.TabPane style={{fontSize: "25px"}} tab="ADD BOOK" key={1}>
                </Tabs.TabPane>
                <Tabs.TabPane style={{fontSize: "25px"}} tab="EDIT BOOK">
                </Tabs.TabPane>
            </Tabs>
        </Col>
    )
}

export default AdministartionMain;