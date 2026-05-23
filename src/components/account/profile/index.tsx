import { Avatar, Card, Image, Space, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import BookNotes from './bookNotes/BookNotes';
import { useQuery } from '../../../hoc/useQuery';
import { activeBooksStatisticApi, userApi, ActiveBooksStatistic, isBadStatusCode } from 'api';
import { userSelectors, useAppSelector } from 'store';
import { useLazyQuery } from '@apollo/client';
import { GetUserProfile } from 'query/users/models';
import { GetLastBookNotesType, GET_USER_PROFILE, GET_LAST_BOOK_NOTES } from 'query';
import ReadingCalendarStatistic from '../../activeBooksStatistic/ReadingCalendarStatistic';
import { CustomSpin, SubUnsubButton } from 'commonComponents';
import EditProfile from './editProfile/EditProfile';
import AboutMe from './aboutMe/AboutMe';
import styles from './index.module.css';

const { Paragraph, Title } = Typography;

const Profile: React.FC = () => {
  const query = useQuery();
  const currentUser = useAppSelector(userSelectors.curUser);

  const [loading, setLoading] = useState(true);
  const [activeBooksStatistic, setActiveBooksStatistic] = useState<ActiveBooksStatistic>();
  const [userProfile, setUserProfile] = useState<GetUserProfile>();
  const [bookNotes, setBookNotes] = useState<GetLastBookNotesType>();

  const [getUserProfile] = useLazyQuery<GetUserProfile>(GET_USER_PROFILE);
  const [getBookNotes] = useLazyQuery<GetLastBookNotesType>(GET_LAST_BOOK_NOTES);

  useEffect(() => {
    const userId = query.get('userId') ?? currentUser!.id;

    Promise.all([
      activeBooksStatisticApi.getActiveBooksStatistic(userId),
      getUserProfile({ variables: { userId }, fetchPolicy: 'network-only' }),
      getBookNotes({ variables: { userId, take: 4 }, fetchPolicy: 'network-only' }),
    ]).then(([resGetActiveBooksStatistic, resGetUserProfile, resGetBookNotes]) => {
      setActiveBooksStatistic(resGetActiveBooksStatistic.data);
      setUserProfile(resGetUserProfile.data);
      setBookNotes(resGetBookNotes.data);
      setLoading(false);
    });
  }, [currentUser, getBookNotes, getUserProfile, query]);

  const unsubscribeUser = (userId: string) => {
    return userApi.unsubscribeUser(userId).then((res) => !isBadStatusCode(res.status));
  };

  const subscribeToUser = (userId: string) => {
    return userApi.subscribeToUser(userId).then((res) => !isBadStatusCode(res.status));
  };

  const onEditProfile = useCallback(
    (userName: string, description: string) => {
      setUserProfile({
        ...userProfile,
        userById: {
          ...userProfile!.userById,
          userName,
          description,
        },
      });
    },
    [userProfile],
  );

  if (loading) return <CustomSpin loading={loading} />;

  const profile = userProfile?.userById;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Card className={`page-card ${styles.profileCard}`}>
          {profile?.avatarDataBase64 ? (
            <Avatar
              size={170}
              className={styles.avatar}
              src={<Image preview={false} src={`data:image/png;base64,${profile.avatarDataBase64}`} />}
            />
          ) : (
            <Avatar size={170} icon={<UserOutlined />} className={styles.avatar} />
          )}

          <Title level={2} style={{ marginBottom: 8 }}>
            {profile?.userName}
          </Title>
          <Paragraph>{profile?.description || 'This reader has not added a bio yet.'}</Paragraph>

          <div className={styles.stats}>
            <div className={styles.statChip}>
              <TeamOutlined /> {profile?.subscribersCount} followers
            </div>
            <div className={styles.statChip}>{profile?.subscriptionsCount} following</div>
          </div>

          <div style={{ marginTop: 20 }}>
            {currentUser?.id === profile?.id ? (
              <EditProfile
                userName={profile!.userName}
                description={profile!.description}
                onEditProfile={onEditProfile}
              />
            ) : (
              <SubUnsubButton
                userId={profile!.id}
                unsubscribeUser={unsubscribeUser}
                subscribeToUser={subscribeToUser}
                isSubscription={profile!.isSubscribed}
              />
            )}
          </div>
        </Card>

        <Card className={`page-card ${styles.calendarCard}`}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <div>
              <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
                Reading momentum
              </Title>
              <Paragraph style={{ marginBottom: 0 }}>
                A quick snapshot of recent consistency and reading intensity.
              </Paragraph>
            </div>

            <ReadingCalendarStatistic
              statistic={activeBooksStatistic as ActiveBooksStatistic}
              userId={profile?.id}
            />
          </Space>
        </Card>
      </div>

      <Card className={`page-card ${styles.aboutCard}`}>
        <AboutMe aboutMe={profile?.description} />
      </Card>

      <Card className={`page-card ${styles.notesCard}`}>
        <BookNotes getLastBookNotes={bookNotes as GetLastBookNotesType} />
      </Card>
    </div>
  );
};

export default Profile;
