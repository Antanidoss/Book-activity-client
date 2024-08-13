import { Button, Col, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { ReactNode, useEffect, useState } from 'react';
import { DislikeTwoTone, LikeTwoTone } from '@ant-design/icons';
import {
  GetBookOpinionByUserId,
  GetBookOpinionByUserIdItem,
  GET_BOOK_OPINION_BY_USER_ID,
} from 'query';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store';
import { CustomSpin } from 'commonComponents';

const BookOpinionView: React.FC<{ bookId: string; trigger: ReactNode }> = ({ bookId, trigger }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookOpinion, setBookOpinion] = useState<GetBookOpinionByUserIdItem>();
  const [loading, setLoading] = useState(bookOpinion === undefined);

  const userId = useSelector(userSelectors.userId);

  const [getBookOpinion] = useLazyQuery<GetBookOpinionByUserId>(GET_BOOK_OPINION_BY_USER_ID, {
    variables: {
      bookId,
      userId,
    },
  });

  useEffect(() => {
    if (isModalVisible) {
      getBookOpinion().then((res) => {
        setBookOpinion(res.data?.bookOpinions.items[0]);
        setLoading(false);
      });
    }
  }, [getBookOpinion, isModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Col onClick={showModal}>{trigger}</Col>
      <Modal
        title="Book opinion"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        {loading ? (
          <CustomSpin loading={loading} />
        ) : (
          <Col>
            <TextArea
              value={bookOpinion?.description}
              rows={10}
              readOnly
              autoSize
              style={{ maxHeight: '700px' }}
            />
            <Col style={{ marginTop: '20px' }}>
              <Rate value={bookOpinion?.grade} allowHalf disabled={true} />
              <Button style={{ marginLeft: '20px' }} disabled>
                <LikeTwoTone /> {bookOpinion?.likesCount}
              </Button>
              <Button disabled>
                <DislikeTwoTone /> {bookOpinion?.dislikesCount}
              </Button>
            </Col>
          </Col>
        )}
      </Modal>
    </>
  );
};

export default BookOpinionView;
