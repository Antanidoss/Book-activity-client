import React, { useState } from "react";
import { PropsType } from "./BookFilterContainer";
import {
    FilterOutlined
} from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row } from "antd";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Search from "antd/lib/transfer/search";
import { BookFilterType } from "../../../types/bookFilterType";
import CustomDrawer from "../../common/CustomDrawer";

const BookFilter: React.FC<PropsType> = (props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (bookFilterModel: BookFilterType) => {
        props.updateBookFilter(bookFilterModel);
        props.getBooksByFilter();
        onClose();
    };

    return <>
        <Col style={{ height: "50px" }} span={24}>
            <Button onClick={showDrawer} shape="round" type="primary" style={{ marginLeft: "50px", marginTop: "20px", width: "150px" }} icon={React.createElement(FilterOutlined)}>Filter</Button>
        </Col>

        <CustomDrawer
            open={open}
            direction="right"
            onClose={onClose}
            size={600}
            style={{ height: "98%", top: "64px" }}>
            <Form
                onFinish={onFinish}
                style={{ marginTop: "50px" }}
                wrapperCol={{ span: 16, offset: 4 }}
                initialValues={{ bookTitle: props.bookFilter.bookTitle, averageRatingFrom: props.bookFilter.averageRatingFrom, averageRatingTo: props.bookFilter.averageRatingTo }}>
                <Form.Item
                    wrapperCol={{ offset: 11, span: 10, }}>
                    <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Filter</div>
                </Form.Item>

                <Form.Item
                    name="bookTitle">
                    <Search placeholder="input book title" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 11, span: 10, }}>
                    <div style={{ fontSize: "20px" }}>Rating</div>
                </Form.Item>

                <Row>
                    <Col sm={8} offset={5}>
                        <Form.Item
                            label="from"
                            name="averageRatingFrom">
                            <InputNumber min={0} max={5} />
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item
                            label="to"
                            name="averageRatingTo">
                            <InputNumber min={0} max={5} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    style={{ marginTop: "50px" }}
                    wrapperCol={{ offset: 10, span: 4 }}>
                    <Button type="primary" htmlType="submit" shape="round" block>
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </CustomDrawer>
    </>
}

export default BookFilter;