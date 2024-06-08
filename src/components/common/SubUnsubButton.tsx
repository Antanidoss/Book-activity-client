import { Button, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from 'reduxStore';
import { ROUT_PAGE_NAME } from 'common';

export const SubUnsubButton: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const [subUnsubButtonLoadin, setSubUnsubButtonLoadin] = useState(false)
    const isAuthenticated = useSelector(userSelectors.isAuthenticated);

    const subscribeToUser = (userId: string) => {
        setSubUnsubButtonLoadin(true);

        if (!isAuthenticated) {
            return navigate(ROUT_PAGE_NAME.USER_LOGIN);
        }

        props.subscribeToUser(userId).then(isSuccess => {
            isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6);
            setSubUnsubButtonLoadin(false);
        });
    }

    const unsubscribeUser = (userId: string) => {
        setSubUnsubButtonLoadin(true);

        if (!isAuthenticated) {
            return navigate(ROUT_PAGE_NAME.USER_LOGIN);
        }

        props.unsubscribeUser(userId).then(isSuccess => {
            isSuccess ?  message.success("You have successfully unsubscribed", 6) : message.error("Failed to unsubscribed", 6);
            setSubUnsubButtonLoadin(false);
        });
    }

    return props.isSubscription
        ? <Button shape="round" onClick={() => unsubscribeUser(props.userId)} type="primary" style={props.style} loading={subUnsubButtonLoadin}>Unsubscribe</Button>
        : <Button shape="round" onClick={() => subscribeToUser(props.userId)} type="primary" style={props.style} loading={subUnsubButtonLoadin}>Subscribe</Button>
}

type PropsType = {
    style?: React.CSSProperties,
    isSubscription: boolean,
    userId: string,
    unsubscribeUser: (userId: string) => Promise<boolean>,
    subscribeToUser: (userId: string) => Promise<boolean>,
}