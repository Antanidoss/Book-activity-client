import { Avatar, Button, Col, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';
import BookNotes from './bookNotes/BookNotes';
import { useQuery } from '../../../hoc/useQuery';
import { activeBooksStatisticApi, userApi, ActiveBooksStatistic, isBadStatusCode } from 'api';
import { useSelector } from 'react-redux';
import { userSelectors } from 'reduxStore';
import { useLazyQuery } from '@apollo/client';
import { GetUserProfile } from 'query/users/models';
import { GetLastBookNotesType, GET_USER_PROFILE, GET_LAST_BOOK_NOTES } from 'query';
import ReadingCalendarStatistic from '../../activeBooksStatistic/ReadingCalendarStatistic';
import { CustomSpin, SubUnsubButton } from 'commonComponents';

const Profile: React.FC = () => {
  const query = useQuery();

  const currentUser = useSelector(userSelectors.curUser);

  const [loading, setLoading] = useState(true);
  const [activeBooksStatistic, setActiveBooksStatistic] = useState<ActiveBooksStatistic>();
  const [userProfile, setUserProfile] = useState<GetUserProfile>();
  const [bookNotes, setBookNotes] = useState<GetLastBookNotesType>();

  const [getUserProfile] = useLazyQuery<GetUserProfile>(GET_USER_PROFILE);
  const [getBookNotes] = useLazyQuery<GetLastBookNotesType>(GET_LAST_BOOK_NOTES);

  useEffect(() => {
    let userId = query.get('userId') ?? '';

    if (userId === '') {
      userId = currentUser!.id;
    }

    Promise.all([
      activeBooksStatisticApi
        .getActiveBooksStatistic(userId)
        .then((res) => setActiveBooksStatistic(res.data)),
      getUserProfile({
        variables: {
          userId: userId,
        },
      }).then((res) => setUserProfile(res.data)),
      getBookNotes({
        variables: {
          userId: userId,
          take: 4,
        },
      }).then((res) => setBookNotes(res.data)),
    ]).then(() => {
      setLoading(false);
    });
  }, [query]);

  const unsubscribeUser = (userId: string) => {
    return userApi.unsubscribeUser(userId).then((res) => !isBadStatusCode(res.status));
  };

  const subscribeToUser = (userId: string) => {
    return userApi.subscribeToUser(userId).then((res) => !isBadStatusCode(res.status));
  };

  if (loading) return <CustomSpin loading={loading} />;

  return (
    <Col span={24} style={{ textAlign: 'center' }}>
      <Col style={{ display: 'inline-block' }}>
        <Row style={{ flexFlow: 'nowrap', justifyContent: 'center' }}>
          <Col style={{ marginTop: '100px' }}>
            <Col>
              <Avatar
                icon={
                  <Image
                    preview={false}
                    src={'data:image/png;base64,' + userProfile?.userById.avatarDataBase64}
                  />
                }
                size={{ xs: 50, sm: 60, md: 130, lg: 150, xl: 160, xxl: 170 }}
                shape="circle"
              />
            </Col>
            <Col style={{ marginTop: '20px', fontSize: '18px', textAlign: 'center' }}>
              {userProfile?.userById.userName}
            </Col>
            <Col style={{ textAlign: 'center', marginTop: '10px' }}>
              <Link to={'#'} style={{ padding: '5px', color: '#5a5e61', cursor: 'pointer' }}>
                {React.createElement(TeamOutlined)} {userProfile?.userById.subscribersCount}{' '}
                followers
              </Link>
              ·
              <Link to={'#'} style={{ padding: '5px', color: '#5a5e61', cursor: 'pointer' }}>
                {userProfile?.userById.subscriptionsCount} following
              </Link>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              {currentUser?.id === userProfile?.userById.id ? (
                <Button style={{ width: '150px' }} shape="round" type="primary">
                  Edit profile
                </Button>
              ) : (
                <SubUnsubButton
                  userId={userProfile!.userById.id}
                  style={{ marginRight: '20px' }}
                  unsubscribeUser={unsubscribeUser}
                  subscribeToUser={subscribeToUser}
                  isSubscription={userProfile!.userById.isSubscribed}
                />
              )}
            </Col>
          </Col>
          <Col style={{ marginLeft: '50px' }}>
            <ReadingCalendarStatistic
              statistic={activeBooksStatistic as ActiveBooksStatistic}
              userId={userProfile?.userById.id}
            />
          </Col>
        </Row>
        <BookNotes getLastBookNotes={bookNotes as GetLastBookNotesType} />
      </Col>
    </Col>
  );
};

export default Profile;
