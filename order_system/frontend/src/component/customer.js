import './../App.css';

import React, { useState, useEffect } from "react";
import Axios from "axios";

import AvaImg from '../asset/avatar.jpeg';
import { Avatar, List, Col, Row } from 'antd';
import "antd/dist/antd.css";

import { server_address, backend_port } from './server_config'

// Should name the function starting with a capital letter!!
function Customer() {
    const [cusList, setCusList] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        Axios.get(server_address + ':' + backend_port + '/api/customer').then((response) => {
            setCusList(response.data.map(row => ({  // Add the data to table
                id: row.CustomerId,
                name: row.Name,
                arrival: row.ArrivalCount,
                totalprice: row.TotalPrice
            })));
        })
    }, []);

  return (
    <div className="App">
      <header className="Cus-header">
      <h1>Star Customers</h1>
      <Row>
        <Col span={12} offset={6}>
            <List
            className='list'
            itemLayout="horizontal"
            dataSource={cusList}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={AvaImg} />}
                title={item.name}
                description={`Customer ${item.id} has finished ${item.arrival} meals here with total cost ${item.totalprice}. Thank you ${item.name}!`}
                />
            </List.Item>
            )}
            />
        </Col>
      </Row>



      </header>

    </div>
  );
}

export default Customer;