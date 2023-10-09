import React, { useState } from 'react';
import Drawer from 'react-modern-drawer'
import {
    CloseOutlined
} from "@ant-design/icons";
import { Button } from 'antd';

const CustomDrawer: React.FC<PropsType> = (props) => {
    document.body.style.overflow = props.open ? 'hidden' : '';
    const [open, setOpen] = useState(props.open ? true : false);

    return (
        <Drawer {...props}>
            <div style={{ display: "flex", flex: "0", alignItems: "center", padding: "16px 24px", lineHeight: "22px" }}>
                <Button onClick={props.onClose} type="primary" shape="round" aria-label="Close"  className="ant-drawer-close" icon={React.createElement(CloseOutlined)} />
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