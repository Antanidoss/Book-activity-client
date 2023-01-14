import React, { useState } from "react";
import { PropsType } from "./NotificationsContainer";
import { NotificationOutlined } from '@ant-design/icons';
import { Badge } from "antd";

const Notifications: React.FC<PropsType> = (props) => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)

    return (
        <>
            <div style={{ float: "right" }}>
                <Badge color="red" count={props.notificationCount} size="small" style={{top: "15px"}}>
                    <NotificationOutlined style={{color: "white"}} onClick={() => changeDisplayNotificationsList(!isOpenNotificationsList)} />
                </Badge>
            </div>
            
        </>
    )
}

export default Notifications;