import './../App.css';

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Axios from "axios";

import { Input, Table, Button, Space, Image, Checkbox, Form, AutoComplete, Cascader, Col, InputNumber, Row, Select} from 'antd';
import { FireOutlined, PlusSquareOutlined, MinusSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


function showList(response, setOrderList) {
  console.log(response.data);
  setOrderList(response.data.map(row => ({  // Add the data to table
      dish_id: row.DishId,
      dish_name: row.DishName,
      price: row.Price,
      amount: row.Amount,
      total_dish_price: row.TotalDishPrice,
      imageurl: row.ImageUrl
  })));
}

// Should name the function starting with a capital letter!!
function Register() {
  const [form] = Form.useForm();

  const [OrderId, setOrderId] = useState('');
  const [orderList, setOrderList] = useState([]);
  const {Search} = Input;

  const base_url = 'http://localhost:3002/api/register/';

  const onAdd = (DishId) => {
    console.log("onAdd", "OrderId:", OrderId, "DishId", DishId);
    Axios.get(base_url + 'add/', {
      params: {
        OrderId: OrderId,
        DishId: DishId
      }
    }).then((response) => {
        showList(response, setOrderList);
    });
  };

  const onMinus = (DishId) => {
    console.log("onMinus", "OrderId:", OrderId, "DishId", DishId);
    Axios.get(base_url + 'minus/', {
      params: {
        OrderId: OrderId,
        DishId: DishId
      }
    }).then((response) => {
        showList(response, setOrderList);
    });
  };

  const onDelete = (DishId) => {
    console.log("onDelete", "OrderId:", OrderId, "DishId", DishId);
    Axios.get(base_url + 'delete/', {
      params: {
        OrderId: OrderId,
        DishId: DishId
      }
    }).then((response) => {
        showList(response, setOrderList);
    });
  };

  const onSearch = (value) => {
    console.log("onSearch", "OrderId:", OrderId);
    Axios.get(base_url + 'search/', {
      params: {
        OrderId: OrderId
      }
    }).then((response) => {
        showList(response, setOrderList);
    });
  };

  const onFinish = (values) => {
    console.log('Success! Name:', values.name, 'Phone:', values.phone, 'Password:', values.password);

    var DummyCustomerId = 0;
    Axios.post(base_url, {
      CustomerId: DummyCustomerId,
      Password: values.password,
      Name: values.name,
      Phone: values.phone
    }).then((response) => {
      console.log('Submitted to server!');

      if(response.data.sqlErrMessage) {
        console.log(response.data.sqlErrMessage);
        if (response.data.sqlErrMessage == "Duplicate Phone Number")
          alert("Duplicate Phone Number! Try Again!");
      } else {
        console.log("Successfully Registered");
        alert("Congratulations! Your new account is ready for ordering!");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed! Check your info: ', errorInfo);
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

  return (
    <div className="App">
      <header className="App-header">
      <h1>Register</h1>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* Group th search bar and the button using Space */}

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
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input style={{ width: '100%' }} />
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
          label="Confirm Password"
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

      </header>
    </div>
  );
}

export default Register;
