import React from 'react';

import foodImg from '../asset/food.png';
import orderImg from '../asset/order.png';
import customerImg from '../asset/customer.png'

import {Card, Col, Row } from 'antd';
import {Link} from 'react-router-dom';

// Should name the function starting with a capital letter!!
function Home() {
    return (
      <div className='App-router'>
        <div className='card-wrapper'>
        <h1>Produce101 - Order System</h1>
        <a
        className="App-link"
        href="https://github.com/cs411-alawini/fa22-cs411-Q-team050-Produce101"
        target="_blank"
        rel="noopener noreferrer">
        GitHub Repos
        </a>
        <p></p><p></p><p></p>
          <Row gutter={256}>
            <Col span={128}>
              <Card 
                title="Food" 
                className='card'
                hoverable
                cover={<img alt='Food' src={foodImg}  height="250"/>}
              >
                <Link to="/food">Food Search</Link>
              </Card>
            </Col>
            <Col span={128}>
              <Card 
                title="Order" 
                className='card'
                hoverable
                cover={<img alt='Order' src={orderImg} height="250"/>}
              >
                <Link to="/order">Make Order</Link>
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