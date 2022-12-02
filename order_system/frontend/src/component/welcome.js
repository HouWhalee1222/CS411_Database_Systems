import './../App.css';

import React, { useState } from "react";
import Axios from "axios";

import { Button, Checkbox, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config'
import {Link} from 'react-router-dom';
import welcomeImg from '../asset/welcomeImg.jpg';

// Should name the function starting with a capital letter!!
function Welcome() {

  const search_url = server_address + ':' + backend_port + '/api/search';
  const popular_url = server_address + ':' + backend_port + '/api/popular';

  const onFinish = (values) => {
    console.log(values);
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
        <h3 style={{ fontFamily: "Comic sans MS" }}> Login </h3>
        <Form
            name="login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}>

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your user name~',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
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