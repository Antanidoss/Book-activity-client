import { Form, Input, Checkbox, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'antd/es/form/Form';
import FormErrorMessage from '../../common/FormErrorMessage';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../redux/users/selectors';
import { userApi } from 'api';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/users/slice';
import { ROUT_PAGE_NAME } from '../../../common/constants';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [form] = useForm();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const isAuthenticated = useSelector(getIsAuthenticated);


    useEffect(() => {
        if (isAuthenticated) {
            return navigate(ROUT_PAGE_NAME.ALL_BOOKS);
        }
    }, [isAuthenticated]);

    type LoginDataType = {
        email: string,
        password: string,
        rememberMe: boolean
    }

    const onFinish = (values: LoginDataType) => {
        setLoading(true);

        userApi.auth(values.email, values.password, values.rememberMe).then(response => {
            if (response.success) {
                dispatch(setCurrentUser({
                    userName: response.result.userName,
                    id: response.result.userId,
                    avatarImage: response.result.avatarImage,
                    roles: response.result.roles
                }));
                return navigate(ROUT_PAGE_NAME.ALL_BOOKS);
            }

            setFormError(response.errorMessage);
            setLoading(false);
        });
    };

    return (
        <Form
            initialValues={{ rememberMe: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            style={{ marginTop: "15%" }}
            onFinish={onFinish}
            form={form}>

            <div style={{textAlign: "center", fontFamily: "Pacifico, cursive", fontSize: "30px", marginBottom: "20px"}}>Authorization</div>
            <FormErrorMessage errorMessage={formError} />

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}>
                <Input type="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="rememberMe"
                valuePropName="checked"
                label="Remember me"
                labelCol={{ sm: { offset: 11 } }}>
                <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                <Button type="primary" htmlType="submit" shape="round" loading={loading} block>
                    Login
                </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }} wrapperCol={{ span: 24 }}>
                <Link to={ROUT_PAGE_NAME.USER_REGISTRATION}>Registration</Link>
            </Form.Item>
        </Form>
    )
}

export default Login;