import './../App.css';

import React, { useState, useEffect } from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";

import { Input, Table, Button, Space, Image, Modal, Alert  } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import { PlusSquareOutlined, MinusSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config'

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
function Order() {
  const {id} = useParams();
  console.log(id);

//   const [OrderId, setOrderId] = useState('');
  const OrderId = 1;
  const [orderList, setOrderList] = useState([]);
  const {Search} = Input;

  const base_url = server_address + ':' + backend_port + '/api/order/';

  const [shownError, setShownError] = useState(false);
  const [beforePrice, setBeforePrice] = useState(0);
  const [afterPrice, setAfterPrice] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [visit, setVisit] = useState(0);
  const [outInfo, setOutInfo] = useState("");


  const showFail = () => {
      setShownError(true);
  }

  const handleConfirm = () => {
      setShownError(false);
  }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        Axios.get(base_url + 'search/', {
            params: {
                OrderId: OrderId
            }
            }).then((response) => {
                showList(response, setOrderList);
            });
    }, []);

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

//   const onSearch = (value) => {
//     console.log("onSearch", "OrderId:", OrderId);
//     Axios.get(base_url + 'search/', {
//       params: {
//         OrderId: OrderId
//       }
//     }).then((response) => {
//         showList(response, setOrderList);
//     });
//   };

  const setValue = ({beforePrice, visit, sumPrice, afterPrice, discount, outInfo}) => {
    setBeforePrice(beforePrice);
    setAfterPrice(afterPrice);
    setSumPrice(sumPrice);
    setDiscount(discount);
    setVisit(visit);
    setOutInfo(outInfo);
  };

  const onCheckout = () => {
    const CustomerId = id;
    console.log("onCheckout", "OrderId:", OrderId, "CustomerId:", CustomerId);
    Axios.get(base_url + 'checkout/', {
      params: {
        OrderId: OrderId,
        CustomerId: CustomerId
      }
    }).then((response) => {
        console.log(response.data[0]);

        // alert(`
        // Check out success!
        // You get ${100 - response.data[0]["@discount"] * 100}% OFF on your order, since you've visited for ${response.data[0]["@visits"]} times and spent $${response.data[0]["@preTotal"]} here in the past. 
        // The price after discount is $${response.data[0]["@total"]}. 
        // Hope to see you again!`);
        const beforePrice = response.data[0]["@oriTotal"];
        const visit = response.data[0]["@visits"];
        const sumPrice = response.data[0]["@preTotal"];
        const afterPrice = response.data[0]["@total"];
        const discount = 100 - response.data[0]["@discount"] * 100;
        const outInfo = `
        Check out success! \
        You get ${100 - response.data[0]["@discount"] * 100}% OFF on your order, \
        since you've visited for ${response.data[0]["@visits"]} times and spent $${response.data[0]["@preTotal"]} here in the past. \
        Oringinal price is $${response.data[0]["@oriTotal"]}. The price after discount is $${response.data[0]["@total"]}. \
        Hope to see you again!`;
        console.log(outInfo);

        setValue({beforePrice, visit, sumPrice, afterPrice, discount, outInfo});

        setOrderList([]);

    })
  };


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
        {/* <Search
            placeholder='Input OrderId'
            enterButton="Search"
            allowClear
            style={{ width: 300, padding: 0, margin: 0}}
            size="large"
            onSearch={onSearch}
            onChange={(e) => setOrderId(e.target.value)}
        /> */}
        <Button
            style={{ background: "green", height: 41, color: 'white', borderColor: 'azure'}}
            icon={<MoneyCollectOutlined />}
            onClick={() => {onCheckout(); showFail();}}>
            {/* onClick={onCheckout}> */}
                Check Out
        </Button>
      </Space>

      <Modal title="Info" open={shownError} onOk={handleConfirm} onCancel={handleConfirm}>
        <Alert
        message="Success Tips"
        description={outInfo}
        type="success"
        showIcon
        />
      </Modal>


      <Table
        columns={columns}
        dataSource={orderList}
        style = {{width: 800, height: 300, padding: 30}}
        pagination = {{pageSize: 5}}
      />
      </header>

    </div>
  );
}

export default Order;