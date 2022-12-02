import './../App.css';

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Axios from "axios";

import { Input, Button, Form, Space } from 'antd';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config';
import welcomeImg from '../asset/welcomeImg.jpg';

// Should name the function starting with a capital letter!!
function Register() {
  const [form] = Form.useForm();

  const base_url = server_address + ':' + backend_port + '/api/register/';

  const onFinish = (values) => {
    console.log('Registration form COMPLETED! Name:', values.name, 'Phone:', values.phone, 'Password:', values.password);

    var DummyCustomerId = 0;
    Axios.post(base_url, {
      CustomerId: DummyCustomerId,
      Password: values.password,
      Name: values.name,
      Phone: values.phone
    }).then((response) => {
      console.log('Registration form submitted to server!');

      if(response.data.sqlErrMessage) {
        console.log("SQL raised an error:", response.data.sqlErrMessage);
        if (response.data.sqlErrMessage === "Duplicate Phone Number")
          alert("Registration FAILED! Duplicate Phone Number!");
      } else {
        console.log("Registration SUCCESS! New customer ID:", response.data[0].CustomerId);
        alert("Congratulations! Your new account is ready for ordering!");

        // Go to home page
        let new_customer_id = response.data[0].CustomerId;
        window.location.href = `/home/${new_customer_id}`;
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Registration form ERROR! Check your info: ', errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const bgstyles = {
    backgroundImage: `url(${welcomeImg})`,
    backgroundPosition:'center',
    backgroundSize:'cover',
    backgroundRepeat: 'no-repeat',
    width:'100vw',
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
      <h3 style={{ fontFamily: "Arial Black" }}> Register </h3>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
         <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

      </Form>
      </Space>

      </header>
    </div>
  );
}

export default Register;
