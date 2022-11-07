import React from 'react';
import Drawer from 'react-modern-drawer'
import {
    CloseOutlined
} from "@ant-design/icons";

const CustomDrawer: React.FC<PropsType> = (props) => {
    document.body.style.overflow = props.open ? 'hidden' : '';

    return (
        <Drawer {...props} style={{ height: "98%", top: "64px" }}>
            <div style={{ display: "flex", flex: "0", alignItems: "center", padding: "16px 24px", lineHeight: "22px" }}>
                <button onClick={props.onClose} type="button" aria-label="Close" className="ant-drawer-close" style={{ fontSize: "20px" }}><CloseOutlined /></button>
            </div>
            {props.children}
        </Drawer>
    )
}

type PropsType = {
    open: boolean;
    onClose?: () => void;
    direction: 'left' | 'right' | 'top' | 'bottom';
    children?: React.ReactNode;
    duration?: number;
    overlayOpacity?: number;
    overlayColor?: String;
    enableOverlay?: boolean;
    style?: React.CSSProperties;
    zIndex?: number;
    size?: number | string;
    className?: string | undefined;
    customIdSuffix?: string | undefined;
}

export default CustomDrawer;