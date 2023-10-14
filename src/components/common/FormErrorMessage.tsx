import React from "react";

const FormErrorMessage: React.FC<PropsType> = (props) => {

    let style = {...props.style, whiteSpace: "pre-wrap", textAlign: "center", color: "red"} as React.CSSProperties
    return (
        <div style={style}>{props.errorMessage}</div>
    )
}

export type PropsType = {
    errorMessage?: string,
    style?: React.CSSProperties
}

export default FormErrorMessage;