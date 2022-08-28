import React from 'react';
import { BookType } from '../../../types/bookType';
import { Col } from 'antd'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { bookMain, bookTitle } from './BookForListStyles';
import AddActiveBookContainer from '../../activeBook/addActiveBook/AddActiveBookContainer';

const Book: React.FC<BookType> = (props) => {
    return (
        <Col span={6}>
            <Col span={24} style={bookMain}>
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{props.title}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "50%" }} src={"data:image/png;base64," + props.imageData} />
                    </Col>
                </Link>
                <Col span={12} style={{ top: "60px" }}>
                    <AddActiveBookContainer bookId={props.id} />
                </Col>
            </Col>
        </Col>
    );
}

export default Book;