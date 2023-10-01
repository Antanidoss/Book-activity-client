import { Button } from "antd";
import { ButtonType } from "antd/es/button";
import React, { CSSProperties, useState } from "react";

const ResizableButton: React.FC<PropsType> = (props) => {
    const [curButtonTitle, setResizeText] = useState("");

    const addTitle = () => {
        if (curButtonTitle === "") {
            setResizeText(props.titleOnResize);
        }
    }

    const clearTitle = () => {
        if (curButtonTitle !== "") {
            setResizeText("");
        }
    }

    return (
        <Button
            disabled={props.disable}
            type={props.type}
            onMouseEnter={addTitle}
            onMouseLeave={clearTitle}
            onClick={props.onClick}
            shape={props.shape}
            icon={props.icon}
            style={props.style}
            loading={props.loading}>{curButtonTitle}</Button>
    )
}

type PropsType = {
    onClick?: () => void,
    shape?: "default" | "circle" | "round",
    type: ButtonType,
    icon: React.ReactNode,
    titleOnResize: string
    style?: CSSProperties,
    disable?: boolean,
    loading?: boolean
}

export default ResizableButton;