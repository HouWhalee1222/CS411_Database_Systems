import './../App.css';

import React, { useState } from "react";
import Axios from "axios";

import AvaImg from '../asset/avatar.jpeg';
import { Avatar, List, Col, Row } from 'antd';
import "antd/dist/antd.css";



// Should name the function starting with a capital letter!!
function Customer() {
    const [CusList, setCusList] = useState([]);

    const showCusList = () => {
        Axios.get("http://localhost:3002/api/customer").then((response) => {
            console.log(response);
            setCusList(response.data.map(row => ({  // Add the data to table
                id: row.CustomerId,
                name: row.Name,
                arrival: row.ArrivalCount,
                totalprice: row.TotalPrice
            })));
        })
    };

    showCusList();

  return (
    <div className="App">
      <header className="Cus-header">
      <h1>Star Customers</h1>
      <Row>
        <Col span={12} offset={6}>
            <List
            className='list'
            itemLayout="horizontal"
            dataSource={CusList}
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