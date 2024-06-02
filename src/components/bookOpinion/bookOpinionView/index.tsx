import { Button, Col, Modal, Rate, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import {
    CommentOutlined,
    DislikeTwoTone,
    LikeTwoTone
} from "@ant-design/icons";
import ResizableButton from "../../common/ResizableButton";
import { GetBookOpinionByUserId, GetBookOpinionByUserIdItem } from "../../../query/bookOpinions/models";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOK_OPINION_BY_USER_ID } from "../../../query/bookOpinions";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/users/selectors";
import CustomSpin from "../../common/CustomSpin";

const BookOpinionView: React.FC<{ bookId: string, resizableButton?: boolean }> = ({ bookId, resizableButton }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookOpinion, setBookOpinion] = useState<GetBookOpinionByUserIdItem>()
    const [loading, setLoading] = useState(bookOpinion === undefined);

    const userId = useSelector(getUserId);

    const [getBookOpinion] = useLazyQuery<GetBookOpinionByUserId>(GET_BOOK_OPINION_BY_USER_ID, {
        variables: {
            bookId,
            userId
        }
    })

    useEffect(() => {
        if (isModalVisible) {
            getBookOpinion().then(res => {
                setBookOpinion(res.data?.bookOpinions.items[0]);
                setLoading(false);
            });
        }
    }, [getBookOpinion, isModalVisible])

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
        
    };

    return (
        <>
            {
                resizableButton || resizableButton === undefined
                    ? <ResizableButton style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Look review" />
                    : <Button style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal}>Look review</Button>

            }
            <Modal title="Book opinion" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                {
                    loading
                        ? <CustomSpin loading={loading} />
                        : <Col>
                            <TextArea value={bookOpinion?.description} rows={10} readOnly autoSize style={{maxHeight: "700px"}} />
                            <Col style={{marginTop: "20px"}}>
                                <Rate value={bookOpinion?.grade} allowHalf disabled={true} />
                                <Button style={{marginLeft: "20px"}} disabled><LikeTwoTone /> {bookOpinion?.likesCount}</Button>
                                <Button disabled><DislikeTwoTone /> {bookOpinion?.dislikesCount}</Button>
                            </Col>
                        </Col>
                }   
            </Modal>
        </>
    )
}

export default BookOpinionView;