import React from "react";
import './App.css';

import Food from './component/food';
import Order from './component/order';
import Home from './component/home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/food",
    element: <Food />
  },
  {
    path: "/order",
    element: <Order />
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;  // Export component as APP
