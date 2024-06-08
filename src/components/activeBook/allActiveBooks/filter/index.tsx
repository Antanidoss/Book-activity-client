import { Affix, Badge, Button, Checkbox, Col, Form, Row, Select } from "antd";
import React, { useState } from "react"
import {
    FilterOutlined
} from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveBookFilter, updateActiveBookFilter, activeBookSelectors } from "reduxStore";
import { ActiveBookFilterType, isActiveBookDefaultFilter } from "common";
import { CustomDrawer } from "commonComponents";

const ActiveBookFilter: React.FC = () => {
    const dispatch = useDispatch();
    const activeBookFilter = useSelector(activeBookSelectors.filter);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (activeBookFilterModel: ActiveBookFilterType) => {
        dispatch(updateActiveBookFilter(activeBookFilterModel));
        onClose();
    };

    const onClearFilter = () => {
        dispatch(clearActiveBookFilter())
        onClose();
    }

    const sortByOptions = [
        {
            value: 0,
            label: "Creation time descending"
        },
        {
            value: 1,
            label: "By ascending time of creation"
        },
        {
            value: 2,
            label: "Descending update time"
        },
    ];

    return (
        <>
            <Col style={{ height: "50px" }} span={3}>
                <Affix offsetTop={1}>
                    <Badge dot={!isActiveBookDefaultFilter(activeBookFilter)} style={{ marginLeft: "50px", marginTop: "20px" }}>
                        <Button onClick={showDrawer} shape="round" type="primary" style={{ marginLeft: "50px", marginTop: "20px", width: "150px" }} icon={React.createElement(FilterOutlined)}>
                            Filter
                        </Button>
                    </Badge>
                </Affix>
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
                    initialValues={{
                        bookTitle: activeBookFilter.bookTitle,
                        sortBy: activeBookFilter.sortBy,
                        withFullRead: activeBookFilter.withFullRead
                    }}>

                    <Form.Item wrapperCol={{ offset: 11, span: 10, }}>
                        <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Filter</div>
                    </Form.Item>

                    <Form.Item name="bookTitle" wrapperCol={{ span: 16, offset: 5 }}>
                        <Search placeholder="Input book title" />
                    </Form.Item>

                    <Form.Item labelCol={{ offset: 6 }} wrapperCol={{ span: 10 }} style={{ "marginTop": "50px" }} label="Sort by" name="sortBy">
                        <Select options={sortByOptions} />
                    </Form.Item>

                    <Form.Item labelCol={{ offset: 10 }} label="With full read" valuePropName="checked" name="withFullRead">
                        <Checkbox />
                    </Form.Item>

                    <Row style={{ marginTop: "50px" }}>
                        <Col sm={4} offset={8}>
                            <Button type="primary" htmlType="submit" shape="round" block>
                                Search
                            </Button>
                        </Col>
                        <Col sm={4} offset={1}>
                            <Button type="primary" shape="round" htmlType="button" onClick={() => onClearFilter()} block>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CustomDrawer>
        </>
    )
}

export default ActiveBookFilter;