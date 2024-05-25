import React, { useState } from "react";
import {
    FilterOutlined
} from "@ant-design/icons";
import { Affix, Badge, Button, Col, Form, InputNumber, Row } from "antd";
import 'react-modern-drawer/dist/index.css'
import Search from "antd/lib/transfer/search";
import CustomDrawer from "../../../common/CustomDrawer";
import { BookFilterType, isDefaultFilter } from "../../../../common/models/books";
import DebounceSelect, { PropsType as SelectProps } from '../../../common/DebounceSelect';
import { useDispatch } from "react-redux";
import { clearFilter, updateBookFilter } from "../../../../redux/books/slice";
import { useSelector } from "react-redux";
import { getBookFilter } from "../../../../redux/books/selectors";
import { useLazyQuery } from "@apollo/client";
import { GetCategoriesByTitle } from "../../../../query/bookCategories/models";
import { GET_CATEGORIES_BY_TITLE } from "../../../../query";

const BookFilter: React.FC = () => {
    const dispatch = useDispatch();
    const bookFilter = useSelector(getBookFilter);
    const [open, setOpen] = useState(false);

    const [getCategories] = useLazyQuery<GetCategoriesByTitle>(GET_CATEGORIES_BY_TITLE, {
        fetchPolicy: "network-only"
    })

    const getBookCategories = async (title: string) => {
        const categories = await getCategories({
            variables: {
                title,
                take: 5
            }
        })

        return categories.data?.categories.items ?? []
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (bookFilterModel: BookFilterType) => {
        dispatch(updateBookFilter(bookFilterModel));
        onClose();
    };

    const onClearFilter = () => {
        dispatch(clearFilter());
        onClose();
    }

    const selectCategoryProps: SelectProps = {
        fetchOptions: getBookCategories,
        debounceTimeout: 800,
        fieldName: "categories",
        placeholder: "Input book categories",
        transformToOptions(items: any) {
            return items.map(c => {
                return {
                    value: c.id,
                    label: c.title
                };
            })
        }
    }

    return <>
        <Col style={{ height: "50px" }} span={3}>
            <Affix offsetTop={1}>
                <Badge dot={!isDefaultFilter(bookFilter)} style={{ marginLeft: "50px", marginTop: "20px" }}>
                    <Button onClick={showDrawer} shape="round" type="primary" style={{ marginLeft: "50px", marginTop: "20px", width: "150px" }} icon={React.createElement(FilterOutlined)}>Filter</Button>
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
                wrapperCol={{ span: 16, offset: 4 }}
                initialValues={{ bookTitle: bookFilter.bookTitle, averageRatingFrom: bookFilter.averageRatingFrom, averageRatingTo: bookFilter.averageRatingTo, categories: bookFilter.categories }}>
                <Form.Item wrapperCol={{ offset: 11, span: 10, }}>
                    <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Filter</div>
                </Form.Item>

                <Form.Item name="bookTitle">
                    <Search placeholder="Input book title" />
                </Form.Item>

                <Form.Item name="categories">
                    <DebounceSelect {...selectCategoryProps} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 10, }}>
                    <div style={{ fontSize: "20px" }}>Rating</div>
                </Form.Item>

                <Row>
                    <Col sm={8} offset={5}>
                        <Form.Item
                            label="from"
                            name="averageRatingFrom">
                            <InputNumber min={0} max={5} required />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="to" name="averageRatingTo">
                            <InputNumber min={0} max={5} required />
                        </Form.Item>
                    </Col>
                </Row>

                <Row style={{marginTop: "50px"}}>
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
}

export default BookFilter;