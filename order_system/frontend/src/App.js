import logo from './logo.svg';
import './App.css';

import React from "react";
import { Input, Space, Table} from 'antd'
import 'antd/dist/antd.css'
import { useState, useEffect } from "react";
import { render } from "react-dom";
import Axios from "axios"

// Should name the function starting with a capital letter!!
// function Intro() {
//   return (
//     <header className="App-header">
//       <h1>Food Search</h1>
//       {/* <img src={logo} className="App-logo" alt="logo" /> */}
//       {/* <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p> */}
//       <a
//         className="App-link"
//         href="https://github.com/cs411-alawini/fa22-cs411-Q-team050-Produce101"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         GitHub Repo
//       </a>
      
//     </header>
//   );
// }

// Should name the function starting with a capital letter!!
function TestForm() {
  return (
    <div className="form">
      <label>Food: </label>
      <input type="text" name="FoodName"></input>
      <label>   Ingredients: </label>
      <input type="text" name="Ingredients"></input>

      <button>Submit</button>
    </div>
  );
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
];

const testData = [
  {
    key: '1',
    dishid: '10000',
    dishname: 'test food',
    price: 100,
    description: 'test'
  },
];


const {Search} = Input;

function App() {
  const [foodName, setFoodName] = useState('');

  const onSearch = () => {
    Axios.post('http://localhost:3002/api/search', {
      foodName: foodName
    }).then(() => {

    })
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Food Search</h1>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <p>
        Edit <code>src/App.js</code> and save to reload.
      </p> */}
      <Search placeholder='input food name' onSearch={onSearch} enterButton="Search" allowClear style={{ width: 304 }} size="large"></Search>
      <p></p>
      <Table columns={columns} dataSource={testData} />
      <p></p>
      <p></p>
      <a
        className="App-link"
        href="https://github.com/cs411-alawini/fa22-cs411-Q-team050-Produce101"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repos
      </a>
      
      </header>
      
      {/* <TestForm /> */}
    </div>
  );
}

export default App;  // Export component as APP
