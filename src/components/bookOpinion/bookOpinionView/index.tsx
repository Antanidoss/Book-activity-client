import { Button, Col, Modal, Rate, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import {
    CommentOutlined
} from "@ant-design/icons";

const BookOpinionView: React.FC<{ bookId: string, resizableButton?: boolean }> = ({ bookId, resizableButton }) => {
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [loading, setLoading] = useState(props.bookOpinion === undefined);

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    // const showModal = () => {
    //     setIsModalVisible(true);
        
    // };

    // return (
    //     <>
    //         {
    //             resizableButton || resizableButton === undefined
    //                 ? <ResizableButton style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Look review" />
    //                 : <Button style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal}>Look review</Button>

    //         }
    //         <Modal title="Book opinion" open={isModalVisible} onCancel={handleCancel}
    //             footer={[
    //                 <Button key="back" onClick={handleCancel}>
    //                     Cancel
    //                 </Button>
    //             ]}>
    //             {
    //                 loading
    //                     ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>
    //                     : <Col>
    //                         <TextArea value={props.bookOpinion?.description} rows={10} disabled={true} autoSize style={{maxHeight: "700px"}} />
    //                         <Rate value={props.bookOpinion?.grade} allowHalf disabled={true} />
    //                     </Col>
    //             }
    //         </Modal>
    //     </>
    // )
    return <></>
}

export default BookOpinionView;