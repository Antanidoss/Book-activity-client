import { Button } from "antd";
import React, { useState } from "react";

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
            type={props.type}
            onMouseEnter={addTitle}
            onMouseLeave={clearTitle}
            onClick={props.onClick}
            shape={props.shape}
            icon={props.icon}>{curButtonTitle}</Button>
    )
}

type PropsType = {
    onClick?: () => void,
    shape?: "default" | "circle" | "round",
    type: "default" | "primary" | "ghost" | "dashed" | "link" | "text",
    icon: React.ReactNode,
    titleOnResize: string
}

export default ResizableButton;