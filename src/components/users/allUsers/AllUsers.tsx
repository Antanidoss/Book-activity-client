import { List, Image, Button, message } from "antd";
import React from "react";
import { PropsType } from "./AllUsersContainer";
import {
    CheckOutlined
} from "@ant-design/icons";

const AllUser: React.FC<PropsType> = (props) => {
    const subscribeToUser = (userId: string) => {
        props.subscribeToUser(userId).then(isSuccess => {
            return isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6)
        });
    }

    return (
        <List
            style={{padding: "50px 150px 150px 150px", alignItems: "center"}}
            dataSource={ props.currentUserId !== null ? props.users.filter(u => u.id !== props.currentUserId) : props.users}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgb(8 68 124)", borderRadius: "10px", marginTop: "50px", backgroundColor: "white" }}>
                    <List.Item.Meta
                        style={{alignItems: "center"}}
                        avatar={<Image style={{width: "50px", maxHeight: "60px", borderRadius: "15px"}} src={("data:image/png;base64," + user.avatarImage)} />}
                        title={user.name}/>
                     { 
                        user.isSubscription
                            ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>You subscribed</Button>
                            : <Button onClick={() => subscribeToUser(user.id)} shape="round" type="primary">Subscribe</Button>
                     }
                </List.Item>
            )} />
    )
}

export default AllUser;