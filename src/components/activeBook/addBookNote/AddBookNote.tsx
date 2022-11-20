import React from 'react';
import ResizableButton from '../../common/ResizableButton';
import { PropsType } from './AddBookNoteContainer';
import {
    PushpinOutlined
} from "@ant-design/icons";

const AddBookNote: React.FC<PropsType> = (props) => {
    return (
        <ResizableButton icon={React.createElement(PushpinOutlined)} shape="round" titleOnResize="Add note" type="primary" />
    )
}

export default AddBookNote;