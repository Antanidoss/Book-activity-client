import React, { useState } from "react";
import { PropsType } from "./NotificationsContainer";
import { NotificationOutlined } from '@ant-design/icons';

const Notifications: React.FC<PropsType> = (props) => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)

    return (
        <div style={{ float: "right" }}>
            <NotificationOutlined onClick={() => changeDisplayNotificationsList(!isOpenNotificationsList)} />
        </div>
    )
}

export default Notifications;