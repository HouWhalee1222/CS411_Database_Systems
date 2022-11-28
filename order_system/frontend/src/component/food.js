import './../App.css';

import React, { useState } from "react";
// import { render } from "react-dom";
import Axios from "axios";

import { Input, Table, Button, Space, Image } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config'

// Should name the function starting with a capital letter!!
function Food() {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
  const {Search} = Input;

  const search_url = server_address + ':' + backend_port + '/api/search';
  const popular_url = server_address + ':' + backend_port + '/api/popular';

  const showList = (response) => {
    setFoodList(response.data.map(row => ({  // Add the data to table
        dishid: row.DishId,
        dishname: row.DishName,
        price: row.Price,
        description: row.Description,
        imageurl: row.ImageUrl
    })));
  }

  const onSearch = (value) => {
    // console.log(value);
    console.log("FoodName:", foodName);
    Axios.get(search_url, {
      params: {
        foodName: foodName
      }
    }).then((response) => {
      // alert('success search');
      console.log(response.data);
      showList(response);
    });
  };

  const onAdd = (orderid, dishid) => {
    console.log("onAdd", "OrderId:", orderid, "DishId", dishid);

    Axios.post(search_url, {
        orderId: orderid,
        dishId: dishid
    }).then((response) => {
      console.log(response.data);
    });
  };


  const searchPopular = () => {
    Axios.get(popular_url).then((response) => {
        console.log(response);
        showList(response);
    })
  }

  const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => (
            <Image
                width={120}
                src= {require('../asset/Food_Images/' + record.imageurl)}
            />
        ),
    },
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
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="large">
            {/* <a onClick={() => onAdd(record.dishid)}>
                <PlusSquareOutlined style={{ fontSize: '1.25em' }}/>
            </a> */}

            {/* <Input.Group compact>
            <Input
                placeholder='Input order id'
            />
            <Button type="primary" onClick={ (e) => onAdd(e.target.value, record.dishid)}>Add</Button>
            </Input.Group> */}

            <Search
                placeholder='orderid'
                enterButton="Add"
                allowClear
                onSearch={(orderid) => onAdd(orderid, record.dishid)}
            />
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
      {/* Group th search bar and the button using Space */}
      <Space size='large'>
        <Search
            placeholder='Input food name'
            enterButton="Search"
            allowClear
            style={{ width: 300, padding: 0, margin: 0}}
            size="large"
            onSearch={onSearch}
            onChange={(e) => setFoodName(e.target.value)}
        />
        <Button
            style={{ background: "lightpink", height: 41, color: 'white', borderColor: 'azure'}}
            icon={<FireOutlined />}
            onClick={searchPopular}/>
      </Space>
        {/* <p></p>
        <p></p>
      <Space size='middle'>
        <Search
            placeholder='Input dish id'
            enterButton="Add dish"
            allowClear
            style={{ width: 300, padding: 0, margin: 0}}
            size="middle"
            // onClick={addFood}
            onSearch={addFood}
        />
      </Space> */}



      <Table
        columns={columns}
        dataSource={foodList}
        style = {{width: 800, height: 300, padding: 30}}
        pagination = {{pageSize: 5}}
      />


      </header>

    </div>
  );
}

export default Food;