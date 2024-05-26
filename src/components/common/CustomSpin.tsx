import { Spin } from "antd";
import React from "react";

const CustomSpin: React.FC<{loading: boolean}> = ({loading}) => {
    return ( 
        <div style={{ textAlign: "center", marginTop: "20%" }}>
            <Spin size="large" spinning={loading} />
        </div>
    );
}

export default CustomSpin;