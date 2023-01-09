import { List, Image, Avatar, Button, message } from "antd";
import React from "react";
import { PropsType } from "./AllUsersContainer";

const AllUser: React.FC<PropsType> = (props) => {
    const subscribeToUser = (userId: string) => {
        props.subscribeToUser(userId).then(isSuccess => {
            return isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6)
        });
    }

    return (
        <List
            style={{padding: "50px 150px 150px 150px"}}
            dataSource={ props.currentUserId !== null ? props.users.filter(u => u.id !== props.currentUserId) : props.users}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgba(140, 140, 140, 0.35)", borderRadius: "10px", padding: "10px", marginTop: "50px" }}>
                    <List.Item.Meta
                        avatar={<Image style={{width: "50px", borderRadius: "15px"}} sizes="" src={("data:image/png;base64," + user.avatarImage)} />}
                        title={user.name}/>
                    <Button onClick={() => subscribeToUser(user.id)} shape="round" type="primary">Subscribe</Button>
                </List.Item>
            )} />
    )
}

export default AllUser;