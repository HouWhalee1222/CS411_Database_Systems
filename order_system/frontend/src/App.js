import React, { useState } from "react";
import './App.css';

import Food from './component/food';
import Order from './component/order';
import Home from './component/home';
import Customer from './component/customer';
import Register from './component/register';
import Welcome from './component/welcome';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />
    },
    {
      path: "/home/:id",
      element: <Home />
    },
    {
      path: "/food/:id",
      element: <Food />
    },
    {
      path: "/order/:id",
      element: <Order />
    },
    {
      path: "/customer",
      element: <Customer />
    },
    {
      path: "/register",
      element: <Register />
    }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;  // Export component as APP
