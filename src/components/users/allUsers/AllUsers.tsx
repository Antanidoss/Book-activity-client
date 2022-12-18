import { List, Image, Avatar, Button } from "antd";
import React from "react";
import { PropsType } from "./AllUsersContainer";

const AllUser: React.FC<PropsType> = (props) => {
    return (
        <List
            style={{padding: "50px 150px 150px 150px"}}
            dataSource={props.users}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgba(140, 140, 140, 0.35)", borderRadius: "10px", padding: "10px", marginTop: "50px" }}>
                    <List.Item.Meta
                        avatar={<Image style={{width: "50px", borderRadius: "15px"}} sizes="" src={("data:image/png;base64," + user.avatarImage)} />}
                        title={user.name}/>
                    <Button shape="round" type="primary">Subscribe</Button>
                </List.Item>
            )} />
    )
}

export default AllUser;