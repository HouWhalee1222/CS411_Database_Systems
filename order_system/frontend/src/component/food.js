import './../App.css';

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Axios from "axios";

import { Space, Input, Table} from 'antd';
import "antd/dist/antd.css";


// Should name the function starting with a capital letter!!
function Food() {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
  const {Search} = Input;


  const onSearch = (value) => {
    // console.log(value);
    console.log("FoodName:", foodName);
    Axios.get('http://localhost:3002/api/search', {
      params: {
        foodName: foodName
      }
    }).then((response) => {
      // alert('success search');
      console.log(response.data);
      setFoodList(response.data.map(row => ({  // Add the data to table
        dishid: row.DishId,
        dishname: row.DishName,
        price: row.Price,
        description: row.Description
      })));
    });
  };

  function onInsert() {
    console.log("FoodName:", foodName);
    alert('success insert');
  }

  const columns = [
    {
      title: 'DishId',
      dataIndex: 'dishid',
      key: 'dishid',
    },
    {
      title: 'DishName',
      dataIndex: 'dishname',
      key: 'dishname',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a href="">Add {record.name}</a>
            <a href="">Delete</a>
          </Space>
        ),
      },
  ];

  // const testData = [
  //   {
  //     key: '1',
  //     dishid: '10000',
  //     dishname: 'test food',
  //     price: 100,
  //     description: 'test'
  //   },
  // ];

  return (
    <div className="App">
      <header className="App-header">
      <h1>Food Search</h1>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Search 
        placeholder='input food name' 
        enterButton="Search" 
        allowClear 
        style={{ width: 300, padding: 0, height: 80, margin: 0}} 
        size="large"
        onSearch={onSearch} 
        onChange={(e) => setFoodName(e.target.value)}
      />


      <Table 
        columns={columns} 
        dataSource={foodList} 
        style = {{width: 800, height: 300, padding: 0}}
      />
      </header>
      
    </div>
  );
}

export default Food;