import { Col, Tabs } from 'antd';
import React from 'react';
import AddBook from './addBook';
import AddAuthor from './addAuthor';

const AdministrationMain: React.FC = () => {
  return (
    <Col style={{ marginLeft: '24px' }} span={24}>
      <Tabs size="large">
        <Tabs.TabPane style={{ fontSize: '25px' }} tab="ADD BOOK" key="1">
          <AddBook />
        </Tabs.TabPane>
        <Tabs.TabPane style={{ fontSize: '25px' }} tab="EDIT BOOK" key="2" />
        <Tabs.TabPane style={{ fontSize: '25px' }} tab="ADD AUTHOR" key="3">
          <AddAuthor />
        </Tabs.TabPane>
      </Tabs>
    </Col>
  );
};

export default AdministrationMain;
