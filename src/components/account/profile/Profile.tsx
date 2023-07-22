import { Avatar, Button, Col, Image, Row } from "antd";
import React from "react";
import { PropsType } from "./ProfileContainer";
import ReadingCalendarStatistic from "../../activeBooksStatistic/ReadingCalendarStatistic/ReadingCalendarStatistic";
import { arrayBufferToBase64 } from "../../../utils/imageUtil";
import { Link } from "react-router-dom";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <Col span={24} style={{ textAlign: "center" }}>
            <Col style={{ display: "inline-block" }}>
                <Row style={{flexFlow: "nowrap"}}>
                    <Col style={{ marginTop: "100px" }}>
                        <Col>
                            <Avatar icon={<Image preview={false} src={("data:image/png;base64," + arrayBufferToBase64(props.userProfile.avatarImage))} />} size={{ xs: 50, sm: 60, md: 130, lg: 150, xl: 160, xxl: 170, }} shape="circle" />
                        </Col>
                        <Col style={{ marginTop: "20px", fontSize: "18px", textAlign: "center" }}>
                            {props.userProfile.userName}
                        </Col>
                        <Col style={{textAlign: "center"}}>
                            <Link to={"#"} style={{padding: "5px", color: "#5a5e61"}}>{props.userProfile.subscribersCount} fllowers</Link>
                            ·
                            <Link to={"#"} style={{padding: "5px", color: "#5a5e61"}}>{props.userProfile.subscriptionsCount} following</Link>
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
