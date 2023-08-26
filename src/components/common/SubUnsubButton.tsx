import { Button, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubUnsubButton: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    const subscribeToUser = (userId: string) => {
        if (!props.isAuthenticated) {
            return navigate("/login");
        }

        props.subscribeToUser(userId).then(isSuccess => {
            isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6);
        });
    }

    const unsubscribeUser = (userId: string) => {
        if (!props.isAuthenticated) {
            return navigate("/login");
        }

        props.unsubscribeUser(userId).then(isSuccess => {
            isSuccess ?  message.success("You have successfully unsubscribed", 6) : message.error("Failed to unsubscribed", 6);
        });
    }

    return props.isSubscribed
        ? <Button shape="round" onClick={() => unsubscribeUser(props.userId)} type="primary" style={props.style}>Unsubscribe</Button>
        : <Button shape="round" onClick={() => subscribeToUser(props.userId)} type="primary" style={props.style}>Subscribe</Button>
}

type PropsType = {
    style?: React.CSSProperties,
    isSubscribed: boolean,
    userId: string,
    isAuthenticated: boolean,
    unsubscribeUser: (userId: string) => Promise<boolean>,
    subscribeToUser: (userId: string) => Promise<boolean>,
}

export default SubUnsubButton;