import React from 'react';
import { BookType } from '../../../types/bookType';
import {Button} from 'antd'
import 'antd/dist/antd.css';

const Book: React.FC<BookType> = (props) => {
    return (
        <div>
            <div>Id: {props.id}</div>
            <div>Имя: {props.title}</div>
            <div>Описание: {props.description}</div>
            <Button type="primary">Make active</Button>
        </div>
    );
}

export default Book;