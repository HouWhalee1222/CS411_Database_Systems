import './../App.css';

import React, { useState } from "react";
import Axios from "axios";

import { Button, Checkbox, Form, Input, Space, Alert, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config'
import {Link} from 'react-router-dom';
import welcomeImg from '../asset/welcomeImg.jpg';

// Should name the function starting with a capital letter!!
function Welcome() {
    const [shownError, setShownError] = useState(false);

    const showFail = () => {
        setShownError(true);
    }

    const handleConfirm = () => {
        setShownError(false);
    }

    const login_url = server_address + ':' + backend_port + '/api/login';

    const onFinish = (values) => {
        console.log(values);
        Axios.get(login_url, {
            params: {
                userid: values.userid,
                password: values.password
            }
            }).then((response) => {
                const cusid = response.data.userid;
                console.log(cusid);
                if (cusid === -1) {
                    showFail();
                } else {
                    window.location.href = `/home/${cusid}`;
                }
        });
    };

    const bgstyles = {
        backgroundImage: `url(${welcomeImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    };

    return (
    <div className="App">
        <header className="App-header" style={bgstyles}>
        <h1>Produce101 - Order System</h1>
        <Modal title="Info" open={shownError} onOk={handleConfirm} onCancel={handleConfirm}>
            <Alert
            message="Error"
            description="Wrong Userid or Password!!!"
            type="error"
            showIcon
            />
        </Modal>
        <Space
            direction="vertical"
            size="large"
            style={{
                display: 'flex',
            }}
        >
        <a
            className="App-link"
            href="https://github.com/cs411-alawini/fa22-cs411-Q-team050-Produce101"
            target="_blank"
            rel="noopener noreferrer">
            GitHub Repos
        </a>
        <p></p>
        <h2 style={{ fontFamily: "Arial Black" }}> Login </h2>
        <Form
            name="login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}>

            <Form.Item
                name="userid"
                rules={[
                    {
                        required: true,
                        message: 'Please input your user id~',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="UserId"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password~',
                    },
                ]}
            >
                <Input 
                    prefix={<LockOutlined className="site-form-item-icon"/>} 
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            <a className="login-form-forgot" href="register">
                Forgot password
            </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
                &nbsp; &nbsp; Or &nbsp; <Link to="/register">Register Now!</Link>
            </Form.Item>
        </Form>
        </Space>

        </header>
    </div>
    );
}

export default Welcome;