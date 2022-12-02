import React, { useState, useEffect } from 'react';

import foodImg from '../asset/food.png';
import orderImg from '../asset/order.png';
import customerImg from '../asset/customer.png'

import {Card, Col, Row } from 'antd';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import { server_address, backend_port } from './server_config'

import Axios from "axios";

// Should name the function starting with a capital letter!!
function Home() {
  const {id} = useParams();
  const foodUrl = `/food/${id}`;
  const orderUrl = `/order/${id}`;

  const [cusName, setCusName] = useState("Abdu");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    Axios.get(server_address + ':' + backend_port + '/api/name', {
      params: {
        id: id
      }
    }).then((response) => {
      console.log(response.data[0].Name);
      setCusName(response.data[0].Name);  
    })
  }, []);

  return (
    <div className='App-router'>
      <div className='card-wrapper'>
      <h1>Produce101 Order System</h1>
      <h2><em>Welcome you, <b>{cusName}</b>!</em></h2>
      <p></p>
        <Row gutter={256}>
          <Col span={128}>
            <Card
              title="Food"
              className='card'
              hoverable
              cover={<img alt='Food' src={foodImg}  height="250"/>}
            >
              <Link to={foodUrl}>Food Search</Link>
            </Card>
          </Col>
          <Col span={128}>
            <Card
              title="Order"
              className='card'
              hoverable
              cover={<img alt='Order' src={orderImg} height="250"/>}
            >
              <Link to={orderUrl}>Make Order</Link>
            </Card>
          </Col>
          <Col span={128}>
            <Card
              title="Customer"
              className='card'
              hoverable
              cover={<img alt='Customer' src={customerImg} height="250"/>}
            >
              <Link to="/customer">Customer Service</Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;