import { Card, Tabs, Typography } from 'antd';
import React from 'react';
import AddBook from './addBook';
import AddAuthor from './addAuthor';

const { Paragraph, Title } = Typography;

const AdministrationMain: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card className="page-card" style={{ padding: 16 }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Administration
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Manage catalog data from a cleaner workspace for books and authors.
        </Paragraph>
      </Card>

      <Card className="page-card">
        <Tabs
          size="large"
          items={[
            { key: '1', label: 'Add Book', children: <AddBook /> },
            { key: '2', label: 'Edit Book', children: <Paragraph>Book editing is not implemented yet.</Paragraph> },
            { key: '3', label: 'Add Author', children: <AddAuthor /> },
          ]}
        />
      </Card>
    </div>
  );
};

export default AdministrationMain;
