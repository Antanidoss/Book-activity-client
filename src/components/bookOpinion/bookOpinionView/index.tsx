import { Button, Modal, Rate, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { ReactNode, useEffect, useState } from 'react';
import { DislikeTwoTone, LikeTwoTone } from '@ant-design/icons';
import {
  GetBookOpinionByUserId,
  GetBookOpinionByUserIdItem,
  GET_BOOK_OPINION_BY_USER_ID,
} from 'query';
import { useLazyQuery } from '@apollo/client';
import { userSelectors, useAppSelector } from 'store';
import { CustomSpin } from 'commonComponents';

const { Paragraph } = Typography;

const BookOpinionView: React.FC<{ bookId: string; trigger: ReactNode }> = ({ bookId, trigger }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookOpinion, setBookOpinion] = useState<GetBookOpinionByUserIdItem>();
  const [loading, setLoading] = useState(bookOpinion === undefined);

  const userId = useAppSelector(userSelectors.userId);

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
      <span onClick={showModal}>{trigger}</span>
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
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Paragraph style={{ marginBottom: 0 }}>
              Review details for your current reading account.
            </Paragraph>
            <TextArea
              value={bookOpinion?.description}
              rows={10}
              readOnly
              autoSize
              style={{ maxHeight: '700px' }}
            />
            <div>
              <Rate value={bookOpinion?.grade} allowHalf disabled={true} />
              <Button style={{ marginLeft: '20px' }} disabled>
                <LikeTwoTone /> {bookOpinion?.likesCount}
              </Button>
              <Button disabled>
                <DislikeTwoTone /> {bookOpinion?.dislikesCount}
              </Button>
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
};

export default BookOpinionView;
