import { List, Image, Row, Col, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined, CommentOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { GetUsers, GetUsersItem, GET_USERS } from 'query';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store';
import { userApi, isBadStatusCode } from 'api';
import { CustomSpin, SubUnsubButton } from 'commonComponents';
import { ROUT_PAGE_NAME } from 'common';

const AllUser: React.FC = () => {
  const [users, setUsers] = useState<GetUsersItem[]>();
  const [loading, setLoading] = useState(true);

  const currentUserId = useSelector(userSelectors.userId);

  const [getUsers] = useLazyQuery<GetUsers>(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data?.users.items);
      setLoading(false);
    });
  }, [getUsers]);

  if (loading) return <CustomSpin loading={loading} />;

  const subUnsubUser = (userId: string, isSubscription: boolean) => {
    return (
      isSubscription ? userApi.subscribeToUser(userId) : userApi.unsubscribeUser(userId)
    ).then((res) => {
      const success = !isBadStatusCode(res.status);

      if (success) {
        setUsers(
          users?.map((u) => {
            if (u.id === userId) {
              return { ...u, isSubscription };
            }

            return u;
          }),
        );
      }

      return success;
    });
  };

  return (
    <List
      style={{ padding: '50px 150px 150px 150px', alignItems: 'center' }}
      dataSource={
        currentUserId !== undefined ? users?.filter((u) => u.id !== currentUserId) : users
      }
      renderItem={(user) => (
        <List.Item
          style={{
            border: '1px solid rgb(8 68 124)',
            borderRadius: '10px',
            marginTop: '50px',
            backgroundColor: 'white',
          }}
        >
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={
              <Link
                style={{ cursor: 'pointer', marginLeft: '20px' }}
                to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}
              >
                <Image
                  preview={false}
                  style={{ width: '50px', maxHeight: '60px', borderRadius: '15px' }}
                  src={'data:image/png;base64,' + user.avatarDataBase64}
                />
              </Link>
            }
            title={
              <Link
                style={{ cursor: 'pointer' }}
                to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}
              >
                {user.userName}
              </Link>
            }
            description={
              <Row>
                <Tooltip title="Active books count">
                  <Col>
                    {React.createElement(BookOutlined)}: {user.activeBookCount}
                  </Col>
                </Tooltip>
                <Tooltip title="Book opinions count">
                  <Col style={{ marginLeft: '10px' }}>
                    {React.createElement(CommentOutlined)}: {user.bookOpinionCount}
                  </Col>
                </Tooltip>
              </Row>
            }
          />
          {
            <SubUnsubButton
              userId={user.id}
              style={{ marginRight: '20px' }}
              unsubscribeUser={(userId) => subUnsubUser(userId, false)}
              subscribeToUser={(userId) => subUnsubUser(userId, true)}
              isSubscription={user.isSubscription}
            />
          }
        </List.Item>
      )}
    />
  );
};

export default AllUser;
