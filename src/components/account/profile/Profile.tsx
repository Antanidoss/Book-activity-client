import { Avatar, Button, Col, Image, Row } from "antd";
import React from "react";
import { PropsType } from "./ProfileContainer";
import ReadingCalendarStatistic from "../../activeBooksStatistic/ReadingCalendarStatistic/ReadingCalendarStatistic";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <Col span={24} style={{ textAlign: "center" }}>
            <Col style={{ display: "inline-block" }}>
                <Row>
                    <Col style={{ marginTop: "100px", display: "inline-block" }}>
                        <Col>
                            <Avatar icon={<Image src={("data:image/png;base64," + props.curUser.avatarImage)} />} size={{ xs: 30, sm: 40, md: 60, lg: 120, xl: 150, xxl: 170, }} shape="circle" />
                        </Col>
                        <Col style={{ marginTop: "50px", fontSize: "18px", textAlign: "center" }}>
                            {props.curUser.name}
                        </Col>
                        <Col style={{ marginTop: "50px" }}>
                            <Button style={{ width: "150px" }} shape="round" type="primary">Edit profile</Button>
                        </Col>
                    </Col>
                    <Col style={{ marginLeft: "50px" }}>
                        <ReadingCalendarStatistic {...props.statistic} />
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}

export default Profile;