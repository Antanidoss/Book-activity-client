import { Avatar, Button, Col, Divider, Image, Row } from "antd";
import React from "react";
import { PropsType } from "./ProfileContainer";
import ReadingCalendarStatistic from "../../activeBooksStatistic/ReadingCalendarStatistic/ReadingCalendarStatistic";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import SubUnsubButton from "../../common/SubUnsubButton";
import BookNotes from "./bookNotes/BookNotes";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <Col span={24} style={{ textAlign: "center" }}>
            <Col style={{ display: "inline-block" }}>
                <Row style={{ flexFlow: "nowrap" }}>
                    <Col style={{ marginTop: "100px" }}>
                        <Col>
                            <Avatar icon={<Image preview={false} src={("data:image/png;base64," + props.userProfile.avatarDataBase64)} />} size={{ xs: 50, sm: 60, md: 130, lg: 150, xl: 160, xxl: 170, }} shape="circle" />
                        </Col>
                        <Col style={{ marginTop: "20px", fontSize: "18px", textAlign: "center" }}>
                            {props.userProfile.userName}
                        </Col>
                        <Col style={{ textAlign: "center", marginTop: "10px" }}>
                            <Link to={"#"} style={{ padding: "5px", color: "#5a5e61", cursor: "pointer" }}>{React.createElement(TeamOutlined)} {props.userProfile.subscribersCount} fllowers</Link>
                            ·
                            <Link to={"#"} style={{ padding: "5px", color: "#5a5e61", cursor: "pointer" }}>{props.userProfile.subscriptionsCount} following</Link>
                        </Col>
                        <Col style={{ marginTop: "20px" }}>
                            {
                                props.curUserId === props.userProfile.id
                                    ? <Button style={{ width: "150px" }} shape="round" type="primary">Edit profile</Button>
                                    : <SubUnsubButton
                                        userId={props.userProfile.id}
                                        style={{ "marginRight": "20px" }}
                                        unsubscribeUser={props.unsubscribeUser}
                                        subscribeToUser={props.subscribeToUser}
                                        isSubscribed={props.userProfile.isSubscribed}
                                        isAuthenticated={props.isAuthenticated} />
                            }
                        </Col>
                    </Col>
                    <Col style={{ marginLeft: "50px" }}>
                        <ReadingCalendarStatistic statistic={props.statistic} userId={props.curUserId} />
                    </Col>
                </Row>
                <BookNotes bookNotes={props.bookNotes} />
            </Col>
        </Col>
    )
}

export default Profile;
