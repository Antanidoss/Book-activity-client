import React, { useState } from "react";
import { PropsType } from "./NotificationsContainer";
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Dropdown, MenuProps } from "antd";

const Notifications: React.FC<PropsType> = (props) => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)
    const items: MenuProps['items'] = props.notifications.map(n => {
        return {
            label: (
                n.description
            ),
            key: n.id,
        }
    })
    return (
        <>
            <div style={{ float: "right" }}>
                <Dropdown menu={{ items }}>
                    <Badge color="red" count={props.notificationCount} size="small" style={{ bottom: "15px" }}>
                        <NotificationOutlined style={{ color: "white" }} onClick={() => changeDisplayNotificationsList(!isOpenNotificationsList)} />
                    </Badge>
                </Dropdown>
            </div>
        </>
    )
}

export default Notifications;