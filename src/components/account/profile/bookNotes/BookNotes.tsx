import React from 'react';
import { Card, Col, Empty, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { GetLastBookNotesType } from 'query';

const { Paragraph, Title } = Typography;

const BookNotes: React.FC<{ getLastBookNotes: GetLastBookNotesType }> = (props) => {
  const bookNotes = props.getLastBookNotes?.bookNotes?.items;

  if (bookNotes === undefined || bookNotes.length === 0) {
    return (
      <>
        <Title level={3} style={{ marginTop: 0 }}>
          Latest notes
        </Title>
        <Empty description="No notes yet" />
      </>
    );
  }

  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        Latest notes
      </Title>
      <Row gutter={[20, 20]}>
        {bookNotes.map((n) => (
          <Col xs={24} md={12} key={n.id}>
            <Card
              style={{
                height: '100%',
                borderRadius: 22,
                borderColor: 'rgba(16, 37, 66, 0.08)',
              }}
              title={<Link to={`/book?bookId=${n.activeBook.book.id}`}>{n.activeBook.book.title}</Link>}
            >
              <Paragraph
                style={{
                  marginBottom: 0,
                  minHeight: 180,
                  padding: 18,
                  borderRadius: 18,
                  backgroundColor: n.noteColor,
                  color: n.noteTextColor,
                  whiteSpace: 'pre-line',
                  fontSize: '1rem',
                }}
              >
                "{n.note}"
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookNotes;
