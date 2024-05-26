import { List, Image, Row, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
    BookOutlined,
    CommentOutlined
} from "@ant-design/icons";
import SubUnsubButton from "../../common/SubUnsubButton";
import { useQuery } from "@apollo/client";
import { GetUsers } from "../../../query/users/models";
import { GET_USERS } from "../../../query/users";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/users/selectors";
import { userApi } from "../../../api/users";
import { isBadStatusCode } from "../../../api/instanceAxios";
import { ROUT_PAGE_NAME } from "../../../types/constants";
import CustomSpin from "../../common/CustomSpin";

const AllUser: React.FC = () => {
    const { loading, data } = useQuery<GetUsers>(GET_USERS);
    const currentUserId = useSelector(getUserId);

    if (loading) return <CustomSpin loading={loading} />

    return (
        <List
            style={{ padding: "50px 150px 150px 150px", alignItems: "center" }}
            dataSource={currentUserId !== undefined ? data?.users.items.filter(u => u.id !== currentUserId) : data?.users.items}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgb(8 68 124)", borderRadius: "10px", marginTop: "50px", backgroundColor: "white" }}>
                    <List.Item.Meta
                        style={{ alignItems: "center" }}
                        avatar={
                            <Link style={{ cursor: "pointer", marginLeft: "20px" }} to={`/${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}>
                                <Image preview={false} style={{ width: "50px", maxHeight: "60px", borderRadius: "15px" }} src={("data:image/png;base64," + user.avatarDataBase64)} />
                            </Link>}
                        title={<Link style={{ cursor: "pointer" }} to={`/${ROUT_PAGE_NAME.USER_PROFILE}?userId=${user.id}`}>{user.userName}</Link>}
                        description=
                        {
                            <Row>
                                <Col>{React.createElement(BookOutlined)}: {user.activeBookCount}</Col>
                                <Col style={{ marginLeft: "10px" }}>{React.createElement(CommentOutlined)}: {user.bookOpinionCount}</Col>
                            </Row>
                        } />
                    {
                        <SubUnsubButton
                            userId={user.id}
                            style={{"marginRight": "20px"}}
                            unsubscribeUser={(userId) => userApi.unsubscribeUser(userId).then(res => !isBadStatusCode(res.status))}
                            subscribeToUser={(userId) => userApi.subscribeToUser(userId).then(res => !isBadStatusCode(res.status))}
                            isSubscribed={user.isSubscriber} />
                    }
                </List.Item>
            )} />
    )
}

export default AllUser;