import React from 'react';
import { BookType } from '../../../types/bookType';
import { Button, Col, Row } from 'antd'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const Book: React.FC<BookType> = (props) => {
    return (
        <Col span={4} style={{ border: "3px solid rgb(8 68 124)", borderRadius: "5px", padding: "20px", backgroundColor: "gainsboro" }}>
            <Link to={"#"} style={{ color: "black" }}>
                <Col span={24} style={{ textAlign: "center", paddingBottom: "20px", fontSize: "18px" }}>{props.title}</Col>
            </Link>
            <Link to={"#"} style={{textAlign: "center"}}>
                <Col span={24} style={{ paddingBottom: "15px" }}>
                    <img width={200} height={250} src={"data:image/png;base64," + props.imageData} />
                </Col>
            </Link>
            <Button type="primary">Make active</Button>
        </Col>
    );
}

export default Book;