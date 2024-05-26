import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Reports from "../pages/Reports";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Packing from "../pages/Packing";
import Dispatch from "../pages/Dispatch";
import "../App.css";

// Define the AppLayout component
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

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

// Ensure createRoot is called only once
let root;
const container = document.getElementById("root");

if (!container._reactRoot) {
  root = createRoot(container);
  container._reactRoot = root;
} else {
  root = container._reactRoot;
}

root.render(
  <RouterProvider router={router} />
);

export default function Routers() {
  return null; // This component is no longer necessary but kept for exporting
}
