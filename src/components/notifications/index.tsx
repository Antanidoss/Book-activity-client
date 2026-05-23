import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Empty,
  Image,
  List,
  Popover,
  Space,
  Typography,
  notification,
} from 'antd';
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { notificationApi, isBadStatusCode } from 'api';
import { GetNotifications, GetNotificationsItem, GET_NOTIFICATIONS } from 'query';
import { useLazyQuery } from '@apollo/client';
import { commonSelectors, userSelectors, useAppSelector } from 'store';
import { SignalRNotification, signalRUtil } from 'common';

const Notifications: React.FC = () => {
  const [notificationsBeingListened, setNotificationsBeingListened] = useState(false);
  const [notifications, setNotifications] = useState<GetNotificationsItem[]>([]);

  const currentUserId = useAppSelector(userSelectors.userId);
  const appInitialized = useAppSelector(commonSelectors.initialized);
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  const [getNotifications] = useLazyQuery<GetNotifications>(GET_NOTIFICATIONS);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appInitialized || !isAuthenticated || notificationsBeingListened) {
      return;
    }

    const onNotificationReceived = (data: SignalRNotification) => {
      setNotifications((prev) =>
        prev.concat([
          {
            id: data.NotificationId,
            description: data.MessageNotification,
            fromUser:
              data.FromUserId !== undefined
                ? { id: data.FromUserId, avatarDataBase64: data.FromUserAvatarDataBase64 }
                : undefined,
          },
        ]),
      );

      notification.open({
        message: 'New activity',
        description: data.MessageNotification,
      });
    };

    signalRUtil.connectToUserNotificationHub(currentUserId as string, onNotificationReceived);

    getNotifications().then((res) => setNotifications(res.data?.notifications.items ?? []));

    setNotificationsBeingListened(true);
  }, [appInitialized, currentUserId, getNotifications, isAuthenticated, navigate, notificationsBeingListened]);

  const removeNotification = (notificationId: string) => {
    notificationApi.removeNotification(notificationId).then((res) => {
      if (!isBadStatusCode(res.status)) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      }
    });
  };

  const content = notifications.length ? (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      style={{ width: 360, maxHeight: 420, overflowY: 'auto' }}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key="close"
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => removeNotification(item.id)}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Link to={`/profile?userId=${item.fromUser?.id}`}>
                <Avatar>
                  <Image
                    preview={false}
                    width={32}
                    src={`data:image/png;base64,${item.fromUser?.avatarDataBase64}`}
                  />
                </Avatar>
              </Link>
            }
            title={<Typography.Text strong>Reader update</Typography.Text>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  ) : (
    <div style={{ width: 320, padding: 12 }}>
      <Empty description="No notifications yet" />
    </div>
  );

  return (
    <Popover trigger="click" placement="bottomRight" content={content} overlayInnerStyle={{ padding: 8 }}>
      <Badge count={notifications.length} size="small">
        <Button shape="round" size="large" type="text">
          <Space size={8}>
            <BellOutlined />
            <span>Updates</span>
          </Space>
        </Button>
      </Badge>
    </Popover>
  );
};

export default Notifications;
