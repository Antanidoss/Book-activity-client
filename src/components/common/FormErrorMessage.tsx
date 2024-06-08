import React from "react";

export const FormErrorMessage: React.FC<PropsType> = (props) => {

    const style = {...props.style, whiteSpace: "pre-wrap", textAlign: "center", color: "red"} as React.CSSProperties
    return (
        <div style={style}>{props.errorMessage}</div>
    )
}

export type PropsType = {
    errorMessage?: string,
    style?: React.CSSProperties
}