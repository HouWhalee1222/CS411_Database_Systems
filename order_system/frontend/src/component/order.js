import './../App.css';

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Axios from "axios";

import { Input, Table, Button, Space } from 'antd';
import { FireOutlined, PlusSquareOutlined, MinusSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


function showList(response, setOrderList) {
  console.log(response.data);
  setOrderList(response.data.map(row => ({  // Add the data to table
      dish_id: row.DishId,
      dish_name: row.DishName,
      price: row.Price,
      amount: row.Amount,
      total_dish_price: row.TotalDishPrice
  })));
}

// Should name the function starting with a capital letter!!
function Order() {
  const [OrderId, setOrderId] = useState('');
  const [orderList, setOrderList] = useState([]);
  const {Search} = Input;

  const base_url = 'http://localhost:3002/api/order/';

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

  const columns = [
    {
      title: 'DishId',
      dataIndex: 'dish_id',
      key: 'dish_id',
    },
    {
      title: 'DishName',
      dataIndex: 'dish_name',
      key: 'dish_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Total Dish Price',
      dataIndex: 'total_dish_price',
      key: 'total_dish_price',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => onAdd(record.dish_id)}>
                <PlusSquareOutlined style={{ fontSize: '1.25em' }}/>
            </a>
            <a onClick={() => onMinus(record.dish_id)}>
                <MinusSquareOutlined style={{ fontSize: '1.25em' }}/>
            </a>
            <a onClick={() => onDelete(record.dish_id)}>
                <CloseSquareOutlined style={{ fontSize: '1.25em' }}/>
            </a>
          </Space>
        ),
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
      <h1>Order</h1>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* Group th search bar and the button using Space */}
      <Space size='large'>
        <Search
            placeholder='Input OrderId'
            enterButton="Search"
            allowClear
            style={{ width: 300, padding: 0, margin: 0}}
            size="large"
            onSearch={onSearch}
            onChange={(e) => setOrderId(e.target.value)}
        />
      </Space>


      <Table
        columns={columns}
        dataSource={orderList}
        style = {{width: 800, height: 300, padding: 30}}
        pagination = {{pageSize: 10}}
      />
      </header>

    </div>
  );
}

export default Order;