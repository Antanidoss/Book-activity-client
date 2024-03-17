import { Affix, Badge, Button, Checkbox, Col, Form, Row, Select } from "antd";
import React, { useState } from "react"
import CustomDrawer from "../../common/CustomDrawer";
import { PropsType } from "./ActiveBookFilterContainer"
import {
    FilterOutlined
} from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import { ActiveBookFilterDefault, ActiveBookFilterType, isDefaultFilter } from "../../../redux/types/activeBooks/activeBookFilter";


const ActiveBookFilter: React.FC<PropsType> = (props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (activeBookFilterModel: ActiveBookFilterType) => {
        props.updateCurrentPageNumber(1);
        props.updateActiveBookFilter(activeBookFilterModel);
        props.getActiveBooks();
        onClose();
    };

    const onClearFilter = () => {
        props.updateCurrentPageNumber(1);
        props.updateActiveBookFilter(ActiveBookFilterDefault);
        props.getActiveBooks();
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
                    <Badge dot={!isDefaultFilter(props.activeBookFilter)} style={{ marginLeft: "50px", marginTop: "20px" }}>
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
                        bookTitle: props.activeBookFilter.bookTitle,
                        sortBy: props.activeBookFilter.sortBy,
                        withFullRead: props.activeBookFilter.withFullRead
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