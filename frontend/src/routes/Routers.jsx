import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login';
// import Signup from '../pages/SignUp';
import Reports from "../pages/Reports";
import Dashboard from "../pages/Dashboard";
import Dispatch from "../pages/Dispatch";
import AppLayout from '../layout/Layout';
import Packing from '../pages/Packing/Packing';
import Packing1 from '../pages/Packing/Packing1';
import Packing2 from '../pages/Packing/Packing2';
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
        path: "packing",
        element: <Packing />,
      },
      {
        path: "packing1",
        element: <Packing1 />,
      },
      {
        path: "packing2",
        element: <Packing2 />,
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