import React from 'react';
import { Drawer } from 'antd';

export const CustomDrawer: React.FC<PropsType> = (props) => {
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      placement={props.direction}
      styles={{ body: { padding: 24 }, header: { paddingInline: 24, paddingBlock: 20 } }}
      width={props.direction === 'left' || props.direction === 'right' ? props.size : undefined}
      height={props.direction === 'top' || props.direction === 'bottom' ? props.size : undefined}
      className={props.className}
      style={props.style}
      zIndex={props.zIndex}
      title={props.title}
      destroyOnHidden
    >
      {props.children}
    </Drawer>
  );
};

type PropsType = {
  open: boolean;
  onClose?: () => void;
  direction: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
  duration?: number;
  overlayOpacity?: number;
  overlayColor?: string;
  enableOverlay?: boolean;
  style?: React.CSSProperties;
  zIndex?: number;
  size?: number | string;
  className?: string | undefined;
  title?: React.ReactNode;
  customIdSuffix?: string | undefined;
};
