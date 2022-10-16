import { Avatar, Col, Image, Row } from "antd";
import React from "react";
import { PropsType } from "./ProfileContainer";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <Col span={24}>
            <Row style={{marginLeft: "200px"}}>
            <Col>
                <Avatar icon={<Image src={("data:image/png;base64," + props.curUser.avatarImage)} />} size={{ xxl: 150, }} shape="circle" />
            </Col>
            <Col>
                {props.curUser.name}
            </Col>
        </Row>
        </Col>
    )
}

export default Profile;