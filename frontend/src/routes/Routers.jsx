import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Reports from "../pages/Reports";
import Dashboard from "../pages/Dashboard";
import Packing from "../pages/Packing";
import Dispatch from "../pages/Dispatch";
import AppLayout from '../layout/Layout';

import "../App.css";


// Define the router configuration
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "packing",
        element: <Packing />,
      },
      {
        path: "dispatch",
        element: <Dispatch />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);
export default router;