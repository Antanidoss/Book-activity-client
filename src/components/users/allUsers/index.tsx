import { Empty, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined, CommentOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { GetUsers, GetUsersItem, GET_USERS } from 'query';
import { userSelectors, useAppSelector } from 'store';
import { userApi, isBadStatusCode } from 'api';
import { CustomSpin, SubUnsubButton } from 'commonComponents';
import { ROUT_PAGE_NAME } from 'common';
import styles from './index.module.css';

const { Paragraph, Title } = Typography;

const AllUser: React.FC = () => {
  const [users, setUsers] = useState<GetUsersItem[]>();
  const [loading, setLoading] = useState(true);
  const currentUserId = useAppSelector(userSelectors.userId);

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

  const visibleUsers =
    currentUserId !== undefined ? users?.filter((u) => u.id !== currentUserId) : users;

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
    <div className={styles.page}>
      <div className={`page-card ${styles.hero}`}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Meet other readers
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Browse the community, jump into profiles, and follow readers whose activity you want to keep up with.
        </Paragraph>
      </div>

      {visibleUsers?.length ? (
        <div className={styles.list}>
          {visibleUsers.map((user) => (
            <div className={styles.card} key={user.id}>
              <div className={styles.meta}>
                <Link to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}>
                  <img
                    className={styles.avatar}
                    src={`data:image/png;base64,${user.avatarDataBase64}`}
                    alt={user.userName}
                  />
                </Link>

                <div>
                  <Link to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}>
                    <Title level={4} style={{ margin: 0 }}>
                      {user.userName}
                    </Title>
                  </Link>
                  <div className={styles.chips}>
                    <span className={styles.chip}>
                      <BookOutlined /> {user.activeBookCount} active books
                    </span>
                    <span className={styles.chip}>
                      <CommentOutlined /> {user.bookOpinionCount} reviews
                    </span>
                  </div>
                </div>
              </div>

              <SubUnsubButton
                userId={user.id}
                unsubscribeUser={(userId) => subUnsubUser(userId, false)}
                subscribeToUser={(userId) => subUnsubUser(userId, true)}
                isSubscription={user.isSubscription}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="page-card" style={{ padding: 32 }}>
          <Empty description="No readers found" />
        </div>
      )}
    </div>
  );
};

export default AllUser;
